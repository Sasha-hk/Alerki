import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '@Module/user/user.controller';
import { UserService } from '@Module/user/user.service';
import { PrismaService } from '@Shared/services/prisma.service';

describe('UserController', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
      controllers: [UserController],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
