import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import Prisma from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

import { UsernameBlockList } from '@Config/api/block-list';
import { UserService } from '@Module/user/user.service';
import { SessionService, ISession } from '@Module/auth/session.service';
import { RegisterDto } from '@Module/auth/dto/register.dto';
import { LogInDto } from '@Module/auth/dto/log-in.dto';
import { SetEnvVariable, SetAs } from '@Shared/decorators/set-env-variable.decorator';
import { JwtTokensService } from '@Module/auth/jwt-tokens.service';
import { AuthRequestToken } from '@Module/auth/interface/auth-request';
import { RefreshTokensDto } from '@Module/auth/dto/refresh-tokens.dto';

export interface MetaData {
  deviceName: string,
  ip: string,
}

export interface LogInData extends MetaData, LogInDto {}

export interface RegisterData extends MetaData, RegisterDto {}

export interface RefreshData extends RefreshTokensDto {
  refreshToken: AuthRequestToken,
}

/**
 * Authentication / authorization service
 */
@Injectable()
export class AuthService {
  @SetEnvVariable('PASSWORD_SALT', SetAs.number)
  private readonly passwordSalt: number;

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly jwtTokensService: JwtTokensService,
  ) {}

  async generateAndSaveSession(
    userId: string,
    data: Pick<ISession, 'ip' | 'deviceName' | 'fingerprint'>,
  ) {
    // Generate tokens
    const tokens = await this.jwtTokensService.generatePairTokens({ id: userId });

    // Create session data
    const sessionData = {
      userId,
      ip: data.ip,
      deviceName: data.deviceName,
      refreshToken: tokens.refreshToken,
      fingerprint: data.fingerprint,
    };

    await this.sessionService.createOrUpdate(sessionData);

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
      username: data.username,
      password: hashedPassword,
    });

    return this.generateAndSaveSession(
      newUser.id,
      data,
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
      candidate = await this.userService.findByUsername(data.username);
    }

    // Check if candidate exists
    if (!candidate) {
      throw new NotFoundException('User not exists');
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

  async logOut(userId: string, refreshToken: string) {
    const candidate = await this.sessionService.findBy({ userId, refreshToken });

    if (!candidate) {
      throw new BadRequestException('Refresh token not exists');
    }

    await this.sessionService.delete(candidate.id);
  }

  async refresh({ refreshToken, fingerprint }: RefreshData) {
    const candidate = await this.sessionService.findBy({
      userId: refreshToken.decoded.id,
      refreshToken: refreshToken.raw,
      fingerprint,
    });

    // Check if session exists
    if (!candidate) {
      throw new UnauthorizedException('Unauthorized or invalid refresh token');
    }

    const tokens = await this.jwtTokensService.generatePairTokens({ id: refreshToken.decoded.id });

    await this.sessionService.update(candidate.id, { refreshToken: tokens.refreshToken });

    return tokens;
  }
}
