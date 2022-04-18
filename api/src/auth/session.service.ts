import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Session } from '@prisma/client';

import { PrismaService } from '../shared/services/prisma.service';

interface UpdateSession extends Pick<Session, 'deviceName' | 'refreshToken'> {}

/**
 * Session service
 */
@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find session by ID
   * @param id Session ID
   * @returns Session if exists
   */
  async findByID(id: string): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: { id },
    });
  }

  /**
   * Find sessions by user ID
   * @param userID User ID
   * @returns Array of sessions if exists
   */
  async findAllByUserID(userID: string): Promise<Array<Session> | null> {
    return this.prisma.session.findMany({
      where: { userID },
    });
  }

  /**
   * Create session
   * @param userID User ID
   * @param deviceName Device name
   * @param refreshToken Refresh token
   * @returns Session object
   */
  async create(userID: string, deviceName: string, refreshToken: string) {
    return this.prisma.session.create({
      data: {
        userID,
        deviceName,
        refreshToken,
      },
    });
  }

  /**
   * Update session
   * @param id Session ID
   * @param options Options
   * @returns Updated session
   */
  async update(id: string, options: UpdateSession) {
    return this.prisma.session.update({
      where: { id },
      data: options,
    });
  }

  /**
   * Create or get updated session
   * @param userID User ID
   * @param deviceName Device name
   * @param refreshToken Refresh token
   * @returns Session
   */
  async updateOrCreate(userID: string, deviceName: string, refreshToken: string) {
    const candidate = await this.prisma.session.findFirst({
      where: {
        userID,
        deviceName,
      },
    });

    if (!candidate) {
      return this.create(userID, deviceName, refreshToken);
    }

    return this.update(candidate.id, {
      deviceName,
      refreshToken,
    });
  }

  /**
   * Delete session by ID
   * @param id Session ID
   */
  async delete(id: string) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw new HttpException('Session not exists', HttpStatus.NOT_FOUND);
    }

    this.prisma.session.delete({
      where: { id },
    });
  }
}
