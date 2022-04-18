import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get device name
 */
export const DeviceName = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.headers?.['user-agent'] || 'undefined';
  },
);
