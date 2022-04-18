import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { UserModule } from '../../user/user.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, SessionService, AuthService],
      controllers: [AuthController],
      imports: [forwardRef(() => UserModule), JwtModule.register({})],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
