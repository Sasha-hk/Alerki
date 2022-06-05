import {
  Controller,
  ValidationPipe,
  UsePipes,
  Delete,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiCookieAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import AuthRequest from './interfaces/authRequest';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { RegisterDto } from '../user/dto/register.dto';
import { LogInDto } from '../user/dto/log-in.dto';
import { SessionDto } from './dto/session.dto';
import { DeviceName } from '../shared/decorators/device-name.decorator';
import { GetUser, CurrentUser } from './get-user.decorator';
import { AuthGuard } from './auth.guard';

/**
 * Auth controller
 */
@ApiTags('Authentication / authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Register user
   * @param res Response
   * @param registerDto Registration DTO
   * @param deviceName Device name
   */
  @Post('register')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ description: 'Register', type: RegisterDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Register user' })
  async register(
    @Res() res: Response,
    @Body() registerDto: RegisterDto,
    @DeviceName() deviceName: string,
  ) {
    const tokens = await this.authService.register(registerDto, deviceName);
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
    res.cookie('accessToken', tokens.accessToken, { maxAge: 30 * 60 * 1000 });
    res.sendStatus(200);
  }

  /**
   * Log-in user
   * @param res Response
   * @param logInDto Log-in DTO
   * @param deviceName Device name
   */
  @Post('log-in')
  @UsePipes(LogInDto)
  @ApiOperation({ summary: 'User log-in' })
  @ApiBody({ description: 'Log-in', type: LogInDto })
  @ApiResponse({ description: 'User authenticated', status: 200 })
  async logIn(
    @Res() res: Response,
    @Body() logInDto: LogInDto,
    @DeviceName() deviceName: string,
  ) {
    const tokens = await this.authService.logIn(logInDto, deviceName);
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
    res.cookie('accessToken', tokens.accessToken, { maxAge: 30 * 60 * 1000 });
    res.sendStatus(200);
  }

  /**
   * Log-out user
   */
  @Get('log-out')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'User log-out' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged out' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User not authorized' })
  @ApiResponse({ description: 'User de authenticated', status: 200 })
  async logOut(@Res() res: Response, @GetUser() user: CurrentUser, @DeviceName() deviceName: string) {
    if (user.refreshToken) {
      await this.sessionService.deleteByRefreshToken(user.id, user.refreshToken);
    } else if (deviceName !== 'undefined') {
      await this.sessionService.deleteByDeviceName(user.id, deviceName);
    }

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.sendStatus(200);
  }

  /**
   * Get sessions
   * @returns Sessions list
   */
  @Get('sessions')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get sessions' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ description: 'Devices list', type: [SessionDto] })
  async getSessions(@GetUser() user: CurrentUser) {
    const sessions = await this.sessionService.findAllByUserID(user.decodedAccessToken.id);

    if (!sessions) {
      throw new HttpException('Sessions not found', HttpStatus.NOT_FOUND);
    }

    return sessions;
  }

  /**
   * Delete session
   * @param id Session ID
   * @returns Deleted session
   */
  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Delete session by ID' })
  @ApiCookieAuth('accessToken')
  @ApiParam({
    description: 'Session ID',
    name: 'id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @UseGuards(AuthGuard)
  @ApiResponse({ description: 'Service deleted', status: 200 })
  async deleteSession(
    @Param('id') id: string,
    @GetUser() user: CurrentUser,
  ) {
    const candidate = await this.sessionService.findByID(id);

    if (candidate.userID !== user.accessToken) {
      throw new HttpException('The session not belongs to the user', HttpStatus.FORBIDDEN);
    }

    await this.sessionService.deleteByID(id);
  }
}
