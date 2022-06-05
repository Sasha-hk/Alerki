import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@Shared/services/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
  imports: [],
})
export class UserModule {}
