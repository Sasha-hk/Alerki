import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Get cookies
 */
export const GetCookies = createParamDecorator(
  <T extends string | Array<string>>(data: T, ctx: ExecutionContext): string | Record<string, string> | undefined => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (Array.isArray(data)) {
      const result: Record<string, string> = { x: 's' };

      data.forEach((key: string) => {
        if (request.cookies[key]) {
          result[key] = request.cookies[key];
        }
      });

      return result;
    }

    return request.cookies[data];
  },
);
