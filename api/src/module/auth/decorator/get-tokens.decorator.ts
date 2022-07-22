import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthRequest } from '@Module/auth/interface/auth-request';

/**
 * Get access token
 */
export const GetAccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();

    return request.user?.tokens?.accessToken;
  },
);

/**
 * Get refresh token
 */
export const GetRefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();

    return request.user?.tokens?.refreshToken;
  },
);
