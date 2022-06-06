import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get client ip
 */
export const GetIP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    return ip;
  },
);
