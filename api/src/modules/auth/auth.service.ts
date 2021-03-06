import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

import { RegisterDto } from '@Module/user/dto/register.dto';
import { LogInDto } from '@Module/user/dto/log-in.dto';
import { UserService } from '@Module/user/user.service';
import { SessionService } from '@Module/auth/session.service';
import { JWT } from '@Module/auth/interfaces/jwt.interface';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register user
   * @param registerDto Register DTO
   * @param deviceName Device name
   * @returns Tokens
   */
  async register(registerDto: RegisterDto, deviceName: string, ip: string) {
    const userData = await this.userService.register(registerDto);
    const tokens = await this.generateTokens({
      id: userData.id,
      username: userData.username,
      email: userData.email,
    });
    await this.sessionService.create(userData.id, deviceName, ip, tokens.refreshToken);

    return tokens;
  }

  /**
   * Log-in user
   * @param logInDto Log-in DTO
   * @param deviceName Device name
   * @returns Tokens
   */
  async logIn(logInDto: LogInDto, deviceName: string, ip: string) {
    let candidate: User;

    // Bind user bu email or username
    if (logInDto.email) {
      candidate = await this.userService.findByEmail(logInDto.email);
    } else if (logInDto.username) {
      candidate = await this.userService.findByUsername(logInDto.username);
    } else {
      throw new HttpException('Required email or username', HttpStatus.BAD_REQUEST);
    }

    // Compare input password and password from database
    if (!bcryptjs.compareSync(logInDto.password, candidate.password)) {
      throw new HttpException('Bad password', HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.generateTokens({
      id: candidate.id,
      username: candidate.username,
      email: candidate.email,
    });

    await this.sessionService.updateOrCreate(candidate.id, deviceName, ip, tokens.refreshToken);

    return tokens;
  }

  /**
   * Refresh tokens
   *
   * @param userID user ID
   * @param deviceName device name
   * @param ip client IP
   */
  async refresh(userID: string, refreshToken: string, deviceName: string, ip: string) {
    const candidate = await this.userService.findOneByID(userID);

    await this.verifyRefreshToken(refreshToken);

    const tokens = await this.generateTokens({
      id: candidate.id,
      username: candidate.username,
      email: candidate.email,
    });

    await this.sessionService.updateOrCreate(candidate.id, deviceName, ip, tokens.refreshToken);

    return tokens;
  }

  /**
   * Generate access token
   * @param jwtPayload JWT payload
   * @returns Access token
   */
  private async generateAccessToken(jwtPayload: JWT) {
    return this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });
  }

  /**
   * Generate refresh token
   * @param jwtPayload JWT payload
   * @returns Refresh token
   */
  private async generateRefreshToken(jwtPayload: JWT) {
    return this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
  }

  /**
   * Generate pair of tokens
   * @param jwtPayload JWT payload
   * @returns Pair of tokens
   */
  private async generateTokens(jwtPayload: JWT) {
    return {
      accessToken: await this.generateAccessToken(jwtPayload),
      refreshToken: await this.generateRefreshToken(jwtPayload),
    };
  }

  /**
   * Verify access token
   * @param accessToken Access token
   * @returns Verified token or exception
   */
  async verifyAccessToken(accessToken: string) {
    return this.jwtService.verifyAsync(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  /**
   * Verify refresh token
   * @param refreshToken Refresh token
   * @returns Verified refresh token or exception
   */
  async verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
