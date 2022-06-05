import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@Module/auth/auth.controller';
import { AuthService } from '@Module/auth/auth.service';
import { SessionService } from '@Module/auth/session.service';
import { PrismaService } from '@Shared/services/prisma.service';
import { UserModule } from '@Module/user/user.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, SessionService, PrismaService],
      controllers: [AuthController],
      imports: [forwardRef(() => UserModule), JwtModule.register({})],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
