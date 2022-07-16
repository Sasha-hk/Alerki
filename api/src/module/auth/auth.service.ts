import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Prisma from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

import { UsernameBlockList } from '@Config/api/block-list';
import { UserService } from '@Module/user/user.service';
import { SessionService, ISession } from '@Module/auth/session.service';
import { RegisterDto } from '@Module/auth/dto/register.dto';
import { LogInDto } from '@Module/auth/dto/log-in.dto';
import { JwtTokenData, JwtTokens } from '@Module/auth/interface/jwt.interface';
import { SetEnvVariable, SetAs } from '@Shared/decorators/set-env-variable.decorator';

export interface MetaData {
  deviceName: string,
  ip: string,
}

export interface LogInData extends MetaData, LogInDto {}

export interface RegisterData extends MetaData, RegisterDto {}

/**
 * Authentication / authorization service
 */
@Injectable()
export class AuthService {
  @SetEnvVariable('JWT_ACCESS_SECRET')
  private readonly jwtAccessSecret: string;

  @SetEnvVariable('JWT_REFRESH_SECRET')
  private readonly jwtRefreshSecret: string;

  @SetEnvVariable('PASSWORD_SALT', SetAs.number)
  private readonly passwordSalt: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Generate access JWT token
   *
   * @param data JWT token data
   * @returns JWT token
   */
  async generateAccessToken(data: JwtTokenData) {
    return this.jwtService.sign(
      data,
      {
        secret: this.jwtAccessSecret,
        expiresIn: '30m',
      },
    );
  }

  /**
   * Generate refresh JWT token
   *
   * @param data JWT token data
   * @returns JWT token
   */
  async generateRefreshToken(data: JwtTokenData) {
    return this.jwtService.sign(
      data,
      {
        secret: this.jwtRefreshSecret,
        expiresIn: '30d',
      },
    );
  }

  /**
   * Generate pair tokens, access and refresh
   *
   * @param data JWT tokens data
   * @returns pair JWT tokens
   */
  async generatePairTokens(data: JwtTokenData): Promise<JwtTokens> {
    return {
      accessToken: await this.generateAccessToken(data),
      refreshToken: await this.generateRefreshToken(data),
    };
  }

  async generateAndSaveSession(
    userId: string,
    data: Pick<ISession, 'ip' | 'deviceName' | 'fingerprint'>,
    create: boolean = false,
  ) {
    // Generate tokens
    const tokens = await this.generatePairTokens({ id: userId });

    const sessionData = {
      userId,
      ip: data.ip,
      deviceName: data.deviceName,
      refreshToken: tokens.refreshToken,
      fingerprint: data.fingerprint,
    };

    if (create) {
      await this.sessionService.create(sessionData);
    } else {
      await this.sessionService.createOrUpdate(sessionData);
    }

    return tokens;
  }

  /**
   * Register user
   *
   * @param data registration data
   * @returns pair JWT tokens
   */
  async register(data: RegisterData) {
    // Check if username is not in the block list
    if (
      UsernameBlockList.has(data.username.toLocaleLowerCase())
      || UsernameBlockList.has(data.username)
    ) {
      throw new BadRequestException('Username is not allowed');
    }

    // Check if email already not exists
    const emailExists = await this.userService.findByEmail(data.email);
    if (emailExists) {
      throw new BadRequestException('Email exists');
    }

    // Check if username already not exists
    const usernameExists = await this.userService.findByUsername(data.username);
    if (usernameExists) {
      throw new BadRequestException('Username exists');
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(data.password, this.passwordSalt);

    // Create new user
    const newUser = await this.userService.create({
      email: data.email.toLocaleLowerCase(),
      username: data.username.toLowerCase(),
      password: hashedPassword,
    });

    return this.generateAndSaveSession(
      newUser.id,
      data,
      true,
    );
  }

  /**
   * Log-in user
   *
   * @param data registration data
   * @returns pair JWT tokens
   */
  async logIn(data: LogInData) {
    // Check if the username or email is exists
    if (!data.email && !data.username) {
      throw new BadRequestException('Required username or email');
    }

    // Find user by email or username
    let candidate: Prisma.User;

    if (data.email) {
      candidate = await this.userService.findByEmail(data.email);
    } else if (data.username) {
      candidate = await this.userService.findByEmail(data.email);
    }

    // Check if candidate exists
    if (!candidate) {
      throw new NotFoundException('Username not exists');
    }

    // Check password
    if (!bcryptjs.compareSync(data.password, candidate.password)) {
      throw new BadRequestException('Bad password');
    }

    return this.generateAndSaveSession(
      candidate.id,
      data,
    );
  }
}
