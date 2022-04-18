import Prisma from '@prisma/client';
import {
  MinLength,
  MaxLength,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

interface ILogIn extends Pick<Prisma.User, 'password'> {
  username?: string;
  email?: string;
}

export class LogInDto implements ILogIn {
  @ApiProperty({
    description: 'Username',
    minLength: 4,
    maxLength: 15,
    type: 'string',
    example: 'james',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @ValidateIf(o => !o.email || o.username)
  readonly username?: string;

  @ApiProperty({
    description: 'Email',
    minLength: 5,
    maxLength: 319,
    type: 'string',
    pattern: '/[a-z]+@[a-z]+.[a-z]+/',
    example: 'james@gmail.com',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(319)
  @Matches(/[a-z]+@[a-z]+.[a-z]+/)
  @ValidateIf(o => !o.username || o.email)
  readonly email?: string;

  @ApiProperty({
    description: 'Password',
    minLength: 4,
    maxLength: 50,
    type: 'string',
    example: '123456',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  readonly password: string;
}
