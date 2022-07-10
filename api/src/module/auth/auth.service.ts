import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * Authentication / authorization service
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken() {}

  async generateRefreshToken() {}

  async generateTokens() {
    return {
      accessToken: await this.generateAccessToken,
      refreshToken: await this.generateTokens,
    };
  }
}
