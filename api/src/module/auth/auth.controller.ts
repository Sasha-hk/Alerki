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
import { Response } from 'express';

import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { DeviceName } from '@Shared/decorators/device-name.decorator';
import { RegisterDto } from '@Module/auth/dto/register.dto';
import { JwtTokens } from '@Module/auth/interface/jwt.interface';

/**
 * Send JWT tokens to headers
 *
 * @param res response
 * @param jwtTokens tokens
 */
function setJwtTokens(res: Response, jwtTokens: JwtTokens) {
  res.cookie('accessToken', jwtTokens.accessToken, { maxAge: 30 * 60 * 1000 });
  res.cookie('refreshToken', jwtTokens.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
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
    // Register user and get tokens
    const tokens = await this.authService.register(body, deviceName, ip);

    // Set tokens to headers
    setJwtTokens(res, tokens);

    res.sendStatus(200);
  }
}
