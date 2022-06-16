import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get cookies
 */
export const Cookies = createParamDecorator(
  (data: string | Array<string>, ctx: ExecutionContext): string | { [key: string]: string } => {
    const request = ctx.switchToHttp().getRequest();

    // Handle array
    if (Array.isArray(data)) {
      const result: { [key: string]: string } = {};

      data.forEach((e: string) => {
        if (request.cookies[e]) {
          result[e] = request.cookies[e];
        }
      });

      return result;
    }

    // Handle single cookies request
    return data ? request.cookies?.[data] : request.cookies;
  },
);
