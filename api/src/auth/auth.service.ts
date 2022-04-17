import { Injectable } from '@nestjs/common';
import Prisma from '@prisma/client';
import { PrismaService } from '../shared/services/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register() {}
}
