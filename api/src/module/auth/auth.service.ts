import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { UsernameBlockList } from '@Config/api/block-list';
import { UserService } from '@Module/user/user.service';
import { SessionService } from '@Module/auth/session.service';
import { RegisterDto } from '@Module/auth/dto/register.dto';
import { JwtTokenData, JwtTokens } from '@Module/auth/interface/jwt.interface';
import { SetEnvVariable, SetAs } from '@Shared/decorators/set-env-variable.decorator';

/**
 * Authentication / authorization service
 */
@Injectable()
export class AuthService {
  @SetEnvVariable('JWT_ACCESS_SECRET') jwtAccessSecret: string;

  @SetEnvVariable('JWT_REFRESH_SECRET') jwtRefreshSecret: string;

  @SetEnvVariable('PASSWORD_SALT', SetAs.number) passwordSalt: number;

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

  /**
   * Register user
   *
   * @param data registration data
   * @param deviceName device name
   * @param ip user IP
   * @returns pair JWT tokens
   */
  async register(data: RegisterDto, deviceName: string, ip: string) {
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
    const hashedPassword = bcryptjs.hashSync(data.password, 1);

    // Create new user
    const newUser = await this.userService.create({
      email: data.email.toLocaleLowerCase(),
      username: data.username.toLowerCase(),
      password: hashedPassword,
    });

    // Generate tokens
    const tokens = await this.generatePairTokens({ id: newUser.id });

    // Create and save session
    await this.sessionService.create({
      userId: newUser.id,
      ip,
      deviceName,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
}
