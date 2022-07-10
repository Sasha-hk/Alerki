import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';

import { PrismaService } from '@Shared/services/prisma.service';

/**
 * Session interface
 */
interface ISession extends Pick<
  Session,
  'userId' |
  'ip' |
  'deviceName' |
  'refreshToken'
> {}

/**
 * Session service
 */
@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
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
   * @param data session data
   * @returns session
   */
  async createOrUpdate(data: ISession) {
    const candidate = await this.findUnique(data);

    if (!candidate) {
      return this.create(data);
    }

    return this.update(candidate.id, data);
  }

  /**
   * Delete session by ID
   *
   * @param id session ID to delete
   */
  async delete(id: string) {
    this.prismaService.session.delete({
      where: {
        id,
      },
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

  /**
   * Find session by user ID
   *
   * @param userId user ID
   * @returns session
   */
  async findAllByUserId(userId: string) {
    return this.prismaService.session.findMany({
      where: {
        userId,
      },
    });
  }

  /**
   * Find unique session
   *
   * @param args session identification information
   * @returns
   */
  async findUnique(args: Pick<Session, 'userId' | 'ip' | 'deviceName'>) {
    return this.prismaService.session.findFirst({
      where: args,
    });
  }

  /**
   * Update session by ID
   *
   * @param id session ID
   * @param data session data to update
   * @returns session
   */
  async update(id: string, data: ISession) {
    return this.prismaService.session.update({
      where: {
        id,
      },
      data,
    });
  }
}
