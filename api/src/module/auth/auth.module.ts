import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@Shared/services/prisma.service';
import { AuthController } from '@Module/auth/auth.controller';
import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { UserModule } from '@Module/user/user.module';
import { JwtTokensService } from '@Module/auth/jwt-tokens.service';

@Module({
  providers: [AuthService, PrismaService, SessionService, JwtService, JwtTokensService],
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule)],
  exports: [],
})
export class AuthModule {}
