import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';

describe('AuthController', () => {
  let Module: AuthModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    Module = module.get<AuthModule>(AuthModule);
  });

  it('should be defined', () => {
    expect(Module).toBeDefined();
  });
});
