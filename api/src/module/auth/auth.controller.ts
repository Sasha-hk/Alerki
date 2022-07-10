import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Ip,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { DeviceName } from '@Shared/decorators/device-name.decorator';
import { RegisterDto } from '@Module/auth/dto/register.dto';

/**
 * Authentication / authorization controller
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @DeviceName() deviceName: string,
    @Ip() ip: string,
  ) {}
}
