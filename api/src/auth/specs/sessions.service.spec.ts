import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from '../session.service';
import { PrismaService } from '../../shared/services/prisma.service';

describe('AuthService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService, PrismaService],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
