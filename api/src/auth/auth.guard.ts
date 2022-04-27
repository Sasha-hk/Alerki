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

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        throw new UnauthorizedException({ message: 'user not authorized' });
      }

      const verified = this.authService.verifyAccessToken(accessToken);

      req.user = {};
      req.user.accessToken = verified;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'user not authorized' });
    }
  }
}
