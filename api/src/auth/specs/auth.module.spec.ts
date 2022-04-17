import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { PrismaService } from '../../shared/services/prisma.service';

describe('AuthController', () => {
  let Module: AuthModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
      imports: [AuthModule],
    }).compile();

    Module = module.get<AuthModule>(AuthModule);
  });

  it('should be defined', () => {
    expect(Module).toBeDefined();
  });
});
