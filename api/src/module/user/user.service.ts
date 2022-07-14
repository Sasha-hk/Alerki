import { Injectable } from '@nestjs/common';
import { PrismaService } from '@Shared/services/prisma.service';

import { RegisterDto } from '@Module/auth/dto/register.dto';

/**
 * User service
 */
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Create new user
   *
   * @param data registration data
   * @returns new user
   */
  async create(data: RegisterDto) {
    return this.prismaService.user.create({ data });
  }

  /**
   * Find user by email
   *
   * @param email user email
   * @returns user
   */
  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  /**
   * Find user by ID
   *
   * @param id user ID
   * @returns user
   */
  async findById(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   * Find user by username
   *
   * @param username username
   * @returns user
   */
  async findByUsername(username: string) {
    return this.prismaService.user.findFirst({
      where: {
        username: username.toLowerCase(),
      },
    });
  }
}
