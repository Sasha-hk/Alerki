import Prisma from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  Length,
  IsString,
  IsOptional,
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
  @IsOptional()
  @MinLength(userConfig.email.minLength)
  @MaxLength(userConfig.email.maxLength)
  @Matches(userConfig.email.patternExp)
  readonly email?: string;

  @ApiProperty(userConfig.username)
  @IsString()
  @IsOptional()
  @MinLength(userConfig.username.minLength)
  @MaxLength(userConfig.username.maxLength)
  @Matches(userConfig.username.patternExp)
  readonly username?: string;

  @ApiProperty(userConfig.password)
  @IsString()
  @MinLength(userConfig.password.minLength)
  @MaxLength(userConfig.password.maxLength)
  readonly password: string;

  @ApiProperty(userConfig.fingerprint)
  @IsString()
  @Length(userConfig.fingerprint.length)
  readonly fingerprint: string;
}
