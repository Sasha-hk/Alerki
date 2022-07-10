import { Injectable } from '@nestjs/common';
import { PrismaService } from '@Shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create() {}

  async findById() {}

  async findByUsername() {}

  async findByEmail() {}

  async delete() {}
}
