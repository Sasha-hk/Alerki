import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

import usernameBlockList from '@Config/username-block-list';
import { PrismaService } from '@Shared/services/prisma.service';
import { RegisterDto } from '@Module/user/dto/register.dto';

/**
 * User service
 */
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find user by ID
   * @param id User ID
   * @returns User if exists
   */
  async findOneByID(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   * Find user by username
   * @param username User username
   * @returns User if exists
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username: {
          equals: username.toLowerCase(),
          mode: 'insensitive',
        },
      },
    });
  }

  /**
   * Find user by email
   * @param email User email
   * @returns User if exists
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email.toLowerCase(),
          mode: 'insensitive',
        },
      },
    });
  }

  /**
   * Register user
   * @param registerDto Register DTO
   * @returns Tokens
   */
  async register(registerDto: RegisterDto) {
    // Check if email already exists
    const checkEmail = await this.findByEmail(registerDto.email);

    if (checkEmail) {
      throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
    }

    // Check if username already exists
    const checkUsername = await this.findByUsername(registerDto.username);

    if (checkUsername) {
      throw new HttpException('User with such username already exists', HttpStatus.BAD_REQUEST);
    }

    // Check if username in block list
    for (const ignoreItem of usernameBlockList) {
      if (ignoreItem === registerDto.username) {
        throw new HttpException('Not available username', HttpStatus.BAD_REQUEST);
      }
    }

    const hashedPassword = bcryptjs.hashSync(registerDto.password, 5);

    const newUser = await this.prisma.user.create({
      data: {
        email: registerDto.email.toLowerCase(),
        username: registerDto.username,
        password: hashedPassword,
      },
    });

    return newUser;
  }
}
