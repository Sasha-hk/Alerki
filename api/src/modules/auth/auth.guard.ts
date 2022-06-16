import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '@Module/auth/auth.service';
import AuthRequest from '@Module/auth/interfaces/authRequest.interface';

/**
 * Authentication guard
 *
 * Check if user authenticated
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req: AuthRequest = context.switchToHttp().getRequest();

    try {
      const accessToken: string = req.cookies.accessToken!;
      const refreshToken: string = req.cookies.refreshToken!;

      if (!accessToken) {
        throw new UnauthorizedException({ message: 'user not authorized' });
      }

      const decodedAccessToken = await this.authService.verifyAccessToken(accessToken);

      req.user = {
        accessToken,
        refreshToken,
        decodedAccessToken,
      };

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'user not authorized' });
    }
  }
}
