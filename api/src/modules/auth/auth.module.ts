import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@Module/auth/auth.controller';
import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { PrismaService } from '@Shared/services/prisma.service';
import { UserModule } from '@Module/user/user.module';

@Module({
  providers: [AuthService, SessionService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, SessionService],
  imports: [forwardRef(() => UserModule), JwtModule.register({})],
})
export class AuthModule {}
