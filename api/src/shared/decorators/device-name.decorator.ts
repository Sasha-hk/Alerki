import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as DeviceDetector from 'device-detector-js';

const deviceDetector = new DeviceDetector();

export const DeviceName = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const device = deviceDetector.parse(request.headers['user-agent']);

    return [device.device.brand, device.os.name].join(' ') || undefined;
  },
);
