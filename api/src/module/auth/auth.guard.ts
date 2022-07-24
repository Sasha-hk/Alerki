import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { AuthService } from '@Module/auth/auth.service';
import { AuthRequest } from '@Module/auth/interface/auth-request';
import { JwtTokensService } from '@Module/auth/jwt-tokens.service';

/**
 * Authorization guard
 *
 * Functionality:
 *
 * - check if `Authorization` header exists
 * - check if JWT token is valid
 * - assign access token to user in request object
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtTokensService: JwtTokensService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req: AuthRequest = context.switchToHttp().getRequest();

    // Check authorization header
    const rawAccessToken = req.headers.authorization as string;

    if (!rawAccessToken) {
      throw new UnauthorizedException('Access token not exists');
    }

    const splitAccessToken = rawAccessToken.split(' ');

    if (splitAccessToken[0] !== 'Bearer' || !splitAccessToken[1]) {
      throw new BadRequestException('Bad authorization header');
    }

    const accessToken = splitAccessToken[1];

    if (!accessToken) {
      throw new UnauthorizedException('Access token not exists');
    }

    try {
      const decodedAccessToken = this.jwtTokensService.verifyAccessToken(accessToken);

      Object.assign(
        req,
        {
          user: {
            tokens: {
              accessToken: {
                raw: accessToken,
                decoded: decodedAccessToken,
              },
            },
          },
        },
      );

      return true;
    } catch (e: any | Error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}

/**
 * Refresh JWT token guard
 *
 * Functionality:
 *
 * - check if refresh JWT token exists in cookie
 * - check JWT token is valid
 * - assign refresh token to user in request object
 */
@Injectable()
export class RefreshTokenGuard {
  constructor(
    private readonly jwtTokensService: JwtTokensService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req: AuthRequest = context.switchToHttp().getRequest();

    const refreshToken = req.cookies.refreshToken!;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token does not exist or expired');
    }

    try {
      const decodedRefreshToken = this.jwtTokensService.verifyRefreshToken(refreshToken);

      Object.assign(
        req,
        {
          user: {
            tokens: {
              refreshToken: {
                raw: refreshToken,
                decoded: decodedRefreshToken,
              },
            },
          },
        },
      );

      return true;
    } catch (e: any | Error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
