import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { OAuthService } from '@Module/auth/oauth.service';
import { UserService } from '@Module/user/user.service';
import { PrismaService } from '@Shared/services/prisma.service';

describe('AuthService', () => {
  let service: OAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService, OAuthService, PrismaService, UserService],
    }).compile();

    service = module.get<OAuthService>(OAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
