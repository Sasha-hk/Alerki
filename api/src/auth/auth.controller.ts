import {
  Controller,
  ValidationPipe,
  UsePipes,
  Delete,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiCookieAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from '../user/dto/register.dto';
import { LogInDto } from '../user/dto/log-in.dto';
import { SessionDto } from './dto/session.dto';
import { DeviceName } from '../shared/decorators/device-name.decorator';
import { AuthGuard } from './auth.guard';

/**
 * Auth controller
 */
@ApiTags('Authentication / authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  ): Promise<void> {
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
  ): Promise<void> {
    console.log(1);
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
  @ApiResponse({ description: 'User de authenticated', status: 200 })
  async logOut(): Promise<void> {
    console.log(1);
  }

  /**
   * Get sessions
   * @returns Sessions list
   */
  @Get('sessions')
  @ApiOperation({ summary: 'Get sessions' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ description: 'Devices list', type: [SessionDto] })
  async getSessions(): Promise<string> {
    return 'sessions';
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
  @ApiResponse({ description: 'Service deleted', status: 200 })
  async deleteSession(@Param('id') id: string): Promise<string> {
    return 'delete service';
  }
}
