import { createParamDecorator, ExecutionContext } from '@nestjs/common';

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
  [key: string]: any;
}
