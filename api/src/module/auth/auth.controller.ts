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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { DeviceName } from '@Shared/decorators/device-name.decorator';
import { RegisterDto } from '@Module/auth/dto/register.dto';
import { JwtTokens } from '@Module/auth/interface/jwt.interface';

/**
 * Send JWT refresh token to header
 *
 * @param res response
 * @param refreshToken refresh token
 */
function setRefreshToken(res: Response, refreshToken: string) {
  // Set header and HTTP only cookie to protect against XSS attack
  res.cookie(
    'refreshToken',
    refreshToken,
    { maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: true,
    },
  );
}

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
  @UsePipes(ValidationPipe)
  async register(
    @Res() res: Response,
    @Body() body: RegisterDto,
    @DeviceName() deviceName: string,
    @Ip() ip: string,
  ) {
    const tokens = await this.authService.register(body, deviceName, ip);

    setRefreshToken(res, tokens.refreshToken);

    res.status(200).json({ accessToken: tokens.accessToken });
  }
}
