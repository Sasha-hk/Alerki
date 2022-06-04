import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/**
 * Authentication guard
 *
 * Check if user authenticated
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        throw new UnauthorizedException({ message: 'user not authorized' });
      }

      const verified = await this.authService.verifyAccessToken(accessToken);

      if (!verified) {
        throw new UnauthorizedException({ message: 'bad access token' });
      }

      req.user = {};
      req.user.accessToken = accessToken;
      req.user.decodedAccessToken = verified;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'user not authorized' });
    }
  }
}
