/* eslint-disable max-len */
import Prisma from '@prisma/client';
import {
  MinLength,
  MaxLength,
  IsString,
  IsEnum,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

interface IRegister extends Pick<Prisma.User, 'username' | 'email' | 'password'> {
  role: 'client' | 'master';
}

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class RegisterDto implements IRegister {
  @ApiProperty({
    description: 'Username',
    minLength: 4,
    maxLength: 4,
    type: 'string',
    example: 'james',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  readonly username: string;

  @ApiProperty({
    description: 'Email',
    minLength: 5,
    maxLength: 319,
    type: 'string',
    pattern: String(emailPattern),
    example: 'james@gmail.com',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(319)
  @Matches(emailPattern)
  readonly email: string;

  @ApiProperty({
    description: 'Email',
    minLength: 4,
    maxLength: 50,
    type: 'string',
    example: '123456',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  readonly password: string;

  @ApiProperty({
    description: 'User role',
    enum: ['client', 'master'],
    type: 'string',
    example: 'client',
  })
  @IsString()
  @IsEnum(['client', 'master'])
  readonly role: 'client' | 'master';
}
