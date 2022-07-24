
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtTokenData, JwtTokens } from '@Module/auth/interface/jwt.interface';
import { SetEnvVariable } from '@Shared/decorators/set-env-variable.decorator';

/**
 * Authentication / authorization service
 */
@Injectable()
export class JwtTokensService {
  @SetEnvVariable('JWT_ACCESS_SECRET')
  private readonly jwtAccessSecret: string;

  @SetEnvVariable('JWT_REFRESH_SECRET')
  private readonly jwtRefreshSecret: string;

  constructor(
    private readonly jwtService: JwtService,
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
   * Verify access JWT token
   *
   * @param accessToken access JWT token
   * @returns verified token
   */
  verifyAccessToken(accessToken: string): JwtTokenData {
    return this.jwtService.verify(
      accessToken,
      {
        secret: this.jwtAccessSecret,
      },
    );
  }

  /**
   * Verify refresh JWT token
   *
   * @param refreshToken refresh JWT token
   * @returns verified token
   */
  verifyRefreshToken(refreshToken: string): JwtTokenData {
    return this.jwtService.verify(
      refreshToken,
      {
        secret: this.jwtRefreshSecret,
      },
    );
  }
}
