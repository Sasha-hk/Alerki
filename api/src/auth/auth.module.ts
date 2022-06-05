import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { PrismaService } from '@Shared/services/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, SessionService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, SessionService],
  imports: [forwardRef(() => UserModule), JwtModule.register({})],
})
export class AuthModule {}
