import { AuthRequestToken } from '@Module/auth/interface/auth-request';
import { JwtTokensService } from '@Module/auth/jwt-tokens.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@prisma/client';

import { PrismaService } from '@Shared/services/prisma.service';
import sleep from '@Shared/util/sleep';

interface ICreateOrUpdate extends Pick<ISession, 'fingerprint'> {
  refreshToken: string;
  userId: string;
  ip?: string;
  deviceName?: string;
}

/**
 * Session interface
 */
export interface ISession extends Pick<
  Session,
  'userId' |
  'ip' |
  'deviceName' |
  'refreshToken' |
  'fingerprint'
> {}

/**
 * Session service
 */
@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtTokensService: JwtTokensService,
  ) {}

  /**
   * Create session
   *
   * @param data session data
   * @returns session
   */
  async create(data: ISession) {
    return this.prismaService.session.create({ data });
  }

  /**
   * Create session if not exists or update
   *
   * Features:
   *
   * - prevent concurrent token generation
   *
   * @param data session data
   * @returns session
   */
  async createOrUpdate(data: ISession) {
    const candidate = await this.findUnique(data);

    if (!candidate) {
      return this.create(data);
    }

    // Prevent concurrent JWT token generation
    if (candidate.refreshToken === data.refreshToken) {
      await sleep(1);
      data.refreshToken = (await this.jwtTokensService.generatePairTokens({ id: data.userId })).refreshToken;
    }

    return this.update(candidate.id, data);
  }

  /**
   * Delete session by ID
   *
   * @param id session ID to delete
   */
  async delete(id: string) {
    return this.prismaService.session.delete({
      where: {
        id,
      },
    });
  }

  async deleteIfExists(id: string) {
    const candidate = await this.findById(id);

    if (!candidate) {
      throw new NotFoundException('Session not exists');
    }

    return this.delete(id);
  }

  /**
   * Find session bu custom parameters
   *
   * @param data session identification information
   * @returns found session
   */
  async findBy(data: Partial<ISession>) {
    return this.prismaService.session.findFirst({
      where: data,
    });
  }

  /**
   * Find session by ID
   *
   * @param id session ID
   * @returns session
   */
  async findById(id: string) {
    return this.prismaService.session.findFirst({
      where: {
        id,
      },
    });
  }

  async findByUserIdAndToken(userId: string, refreshToken: string) {
    return this.prismaService.session.findFirst({
      where: {
        userId,
        refreshToken,
      },
    });
  }

  /**
   * Find all sessions by user ID
   *
   * @param userId user ID
   * @returns session
   */
  async findAllByUserId(userId: string, options: { page: number, limit: number }) {
    return this.prismaService.session.findMany({
      where: {
        userId,
      },
      skip: options.page * options.limit,
      take: options.limit,
    });
  }

  /**
   * Find unique session by:
   *
   * - userId
   * - fingerprint
   *
   * @param data session identification information
   * @returns
   */
  async findUnique(data: Pick<Session, 'userId' | 'fingerprint'>) {
    return this.prismaService.session.findFirst({
      where: {
        userId: data.userId,
        fingerprint: data.fingerprint,
      },
    });
  }

  /**
   * Update session by ID
   *
   * @param id session ID
   * @param data session data to update
   * @returns session
   */
  async update(id: string, data: Partial<ISession>) {
    return this.prismaService.session.update({
      where: {
        id,
      },
      data,
    });
  }
}
