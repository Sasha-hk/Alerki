import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SessionService } from '../../auth/session.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserModule } from '../../user/user.module';

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
