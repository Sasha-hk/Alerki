import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Ip,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  UseGuards,
  NotFoundException,
  Param,
  Query,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { DeviceName } from '@Shared/decorators/device-name.decorator';
import { RegisterDto } from '@Module/auth/dto/register.dto';
import { LogInDto } from '@Module/auth/dto/log-in.dto';
import { JwtTokens } from '@Module/auth/interface/jwt.interface';
import { GetCookies } from '@Shared/decorators/cookies.decorator';
import { AuthGuard, RefreshTokenGuard } from '@Module/auth/auth.guard';
import { AuthRequest, AuthRequestToken } from '@Module/auth/interface/auth-request';
import { GetAccessToken, GetRefreshToken } from '@Module/auth/decorator/get-tokens.decorator';
import { GetSessionsQueryDto } from '@Module/auth/dto/get-sessions.dto';
import { RefreshTokensDto } from '@Module/auth/dto/refresh-tokens.dto';

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
  @ApiOperation({ summary: 'Registration' })
  @ApiBody({ description: 'Register', type: RegisterDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Register user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Prohibit registration' })
  async register(
    @Res() res: Response,
    @Body() body: RegisterDto,
    @DeviceName() deviceName: string,
    @Ip() ip: string,
  ) {
    const tokens = await this.authService.register({ ...body, deviceName, ip });

    setRefreshToken(res, tokens.refreshToken);

    res.status(200).json({ accessToken: tokens.accessToken });
  }

  @Post('log-in')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Log-in' })
  @ApiBody({ description: 'Log-in', type: LogInDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Log-in user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Prohibit log-in' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async logIn(
    @Res() res: Response,
    @Body() body: LogInDto,
    @DeviceName() deviceName: string,
    @Ip() ip: string,
  ) {
    const tokens = await this.authService.logIn({ ...body, deviceName, ip });

    setRefreshToken(res, tokens.refreshToken);

    res.status(200).json({ accessToken: tokens.accessToken });
  }

  @Get('log-out')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Log-out' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Log-out user' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized or has a bad refresh token' })
  async logOut(
    @GetRefreshToken() refreshToken: AuthRequestToken,
    @Res() res: Response,
  ) {
    // Clear refresh token
    res.clearCookie('refreshToken');

    // Check if a refresh token exists and delete it
    await this.authService.logOut(refreshToken.decoded.id, refreshToken.raw);

    res.sendStatus(200);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Refresh tokens' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized or has a bad refresh token' })
  async refresh(
    @Res() res: Response,
    @Body() body: RefreshTokensDto,
    @GetRefreshToken() refreshToken: AuthRequestToken,
  ) {
    const tokens = await this.authService.refresh({ refreshToken, ...body });

    setRefreshToken(res, tokens.refreshToken);

    res.status(200).json({ accessToken: tokens.accessToken });
  }

  @Get('session')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List of user sessions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User sessions' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized' })
  @ApiQuery({ name: 'page', required: false, description: 'page' })
  @ApiQuery({ name: 'limit', required: false, description: 'limit items for page' })
  async sessions(
    @GetAccessToken() accessToken: AuthRequestToken,
    @Query() queries: GetSessionsQueryDto,
  ) {
    const sessions = await this.sessionService.findAllByUserId(accessToken.decoded.id, queries);

    return sessions;
  }

  @Delete('session/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete session' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete session' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Session not fount' })
  @ApiQuery({ name: 'id', required: true, type: 'string', example: '103c090c2641a3976d2d4984bb659d69' })
  async deleteSession(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.sessionService.deleteIfExists(id);
  }
}
