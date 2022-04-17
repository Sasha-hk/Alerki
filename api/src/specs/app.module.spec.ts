import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('UserModule', () => {
  let Module: AppModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    Module = module.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(Module).toBeDefined();
  });
});
