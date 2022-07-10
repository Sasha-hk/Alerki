import Prisma from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from 'class-validator';

import { userConfig } from '@Config/api/params.config';

interface IRegisterDto extends Pick<Prisma.User, 'email' | 'username' | 'password'> {}

/**
 * Register DTO
 */
export class RegisterDto implements IRegisterDto {
  @ApiProperty(userConfig.email)
  @IsString()
  @MinLength(userConfig.email.minLength)
  @MaxLength(userConfig.email.maxLength)
  @Matches(userConfig.email.patternExp)
  readonly email: string;

  @ApiProperty(userConfig.username)
  @IsString()
  @MinLength(userConfig.username.minLength)
  @MaxLength(userConfig.username.maxLength)
  readonly username: string;

  @ApiProperty(userConfig.password)
  @IsString()
  @MinLength(userConfig.password.minLength)
  @MaxLength(userConfig.password.maxLength)
  readonly password: string;
}
