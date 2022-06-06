import { Module } from '@nestjs/common';

import { UserService } from '@Module/user/user.service';
import { UserController } from '@Module/user/user.controller';
import { PrismaService } from '@Shared/services/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
  imports: [],
})
export class UserModule {}
