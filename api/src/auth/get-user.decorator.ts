import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JWT } from './interfaces/jwt.interface';

/**
 * Get user
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);

export interface CurrentUser {
  accessToken: string;
  refreshToken?: string;
  decodedAccessToken: JWT;
  decodedRefreshToken?: JWT;
  [key: string]: any;
}
