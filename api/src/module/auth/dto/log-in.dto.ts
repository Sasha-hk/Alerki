import Prisma from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from 'class-validator';

import { userConfig } from '@Config/api/params.config';

interface ILogInDto extends Pick<Prisma.User, 'password'> {
  email?: string;
  username?: string;
}

/**
 * Log-in DTO
 */
export class LogInDto implements ILogInDto {
  @ApiProperty(userConfig.email)
  @IsString()
  @MinLength(userConfig.email.minLength)
  @MaxLength(userConfig.email.maxLength)
  @Matches(userConfig.email.patternExp)
  readonly email?: string;

  @ApiProperty(userConfig.username)
  @IsString()
  @MinLength(userConfig.username.minLength)
  @MaxLength(userConfig.username.maxLength)
  readonly username?: string;

  @ApiProperty(userConfig.password)
  @IsString()
  @MinLength(userConfig.password.minLength)
  @MaxLength(userConfig.password.maxLength)
  readonly password: string;
}
