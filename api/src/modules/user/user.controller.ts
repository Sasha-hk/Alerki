import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/**
 * User controller
 */
@ApiTags('User')
@Controller('user')
export class UserController {}
