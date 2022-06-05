import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get device name
 */
export const DeviceName = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | 'undefined' => {
    const request = ctx.switchToHttp().getRequest();

    const deviceName: string = request.headers?.['user-agent'] || 'undefined';

    return deviceName.trim();
  },
);
