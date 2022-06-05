import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Session } from '@prisma/client';

import { PrismaService } from '../shared/services/prisma.service';
import { SessionDto } from './dto/session.dto';

interface UpdateSession extends Pick<Session, 'deviceName' | 'refreshToken'> {}

/**
 * Session service
 */
@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find session by ID
   *
   * @param id Session ID
   *
   * @returns Session if exists
   */
  async findByID(id: string): Promise<Session | null> {
    return this.prisma.session.findFirst({
      where: { id },
    });
  }

  /**
   * Find sessions by user ID
   *
   * @param userID User ID
   *
   * @returns Array of sessions if exists
   */
  async findAllByUserID(userID: string): Promise<Array<SessionDto> | null> {
    return this.prisma.session.findMany({
      where: { userID },
      select: {
        id: true,
        deviceName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Create session
   *
   * @param userID User ID
   * @param deviceName Device name
   * @param refreshToken Refresh token
   *
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
   *
   * @param id Session ID
   * @param options Options
   *
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
   *
   * @param userID User ID
   * @param deviceName Device name
   * @param refreshToken Refresh token
   *
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
   *
   * @param id session ID
   */
  async deleteByID(id: string) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw new HttpException('Session not exists', HttpStatus.NOT_FOUND);
    }

    this.prisma.session.delete({
      where: { id },
    });
  }

  /**
   * Delete session by user ID and refresh token
   *
   * @param userID user ID
   * @param refreshToken refresh token to delete
   */
  async deleteByRefreshToken(userID: string, refreshToken: string) {
    const sessions = await this.prisma.session.findMany({
      where: {
        userID,
      },
    });

    for (const session of sessions) {
      if (session.refreshToken === refreshToken) {
        return this.prisma.session.delete({
          where: {
            id: session.id,
          },
        });
      }
    }
  }

  /**
   * Delete session by deviceName
   *
   * @param userID user ID
   * @param deviceName device name
   */
  async deleteByDeviceName(userID: string, deviceName: string) {
    const session = await this.prisma.session.findFirst({
      where: {
        userID,
        deviceName,
      },
    });

    if (session) {
      return this.prisma.session.delete({
        where: {
          id: session.id,
        },
      });
    }
  }
}
