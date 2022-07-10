import { Module } from '@nestjs/common';

import { PrismaService } from '@Shared/services/prisma.service';
import { UserService } from 'src/module/user/user.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [],
  imports: [],
  exports: [UserService],
})
export class UserModule {}
