// Errors
import AuthError from '../errors/auth.error';
import { ILogOut } from './user.service';

// Staff
import prisma from '../prisma';

// Third-party packages
import Prisma from '@prisma/client';
import jwt from 'jsonwebtoken';

export interface ITokenizeUser {
  id: string;
  username: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IDeleteToken extends ILogOut {}

interface IDeleteAuthData {
  id: string;
  userID: string;
}

interface ISaveTokenOptions {
  googleRefreshToken: string;
  googleAccessToken: string;
}

interface IAuthService {
  findAllByUserID(userID: string): Promise<Prisma.Auth[]>;
  findOneByUserID(userID: string): Promise<Prisma.Auth | null>;
  findOneByID(id: string): Promise<Prisma.Auth | null>;
  generateTokens(userData: ITokenizeUser): Promise<ITokens>;
  saveToken(refreshToken: string, userID: string, deviceName: string, options?: ISaveTokenOptions): any;
  validateAccessToken(accessToken: string): ITokenizeUser;
  validateRefreshToken(refreshToken: string): ITokenizeUser;
  deleteToken({ userID, deviceName, refreshToken }: IDeleteToken): void;
  deleteAuthData({ id, userID }: IDeleteAuthData): void;
}

/**
 * Authentication / authorization service
 */
class AuthService implements IAuthService {
  /**
   * Find all auth data by user id
   * @param userID User id
   * @returns Auth data array
   */
  async findAllByUserID(userID: string) {
    return prisma.auth.findMany({
      where: {
        userID,
      },
    });
  }

  /**
   * Find one auth data by user id
   * @param userID User id
   * @returns Auth data
   */
  async findOneByUserID(userID: string): Promise<Prisma.Auth | null> {
    return prisma.auth.findFirst({
      where: {
        userID,
      },
    });
  }

  /**
   * Find one auth data by id
   * @param id Auth data id
   * @returns Auth data if exists
   */
  async findOneByID(id: string): Promise<Prisma.Auth | null> {
    return prisma.auth.findFirst({
      where: {
        id,
      },
    });
  }

  /**
   * Generate access and refresh tokens
   * @param object Data required to generate token
   * @returns Access and refresh tokens
   */
  async generateTokens({
    id,
    username,
    email,
  }: ITokenizeUser) {
    const refreshToken = jwt.sign(
      {
        id,
        username,
        email,
      },
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );

    const accessToken = jwt.sign(
      {
        id,
        username,
        email,
      },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: 60 * 60 * 60,
      },
    );

    return {
      refreshToken,
      accessToken,
    } as ITokens;
  }

  async saveToken(refreshToken: string, userID: string, deviceName: string, options?: ISaveTokenOptions) {
    const candidate = await prisma.auth.findFirst({
      where: {
        userID,
        deviceName,
      },
    });

    if (candidate) {
      await prisma.auth.updateMany(
        {
          where: {
            userID,
            deviceName,
            ...options,
          },
          data: {
            refreshToken,
          },
        },
      );
    } else {
      await prisma.auth.create({
        data: {
          userID,
          deviceName,
          refreshToken,
        },
      });
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

      return decoded as ITokenizeUser;
    } catch (e) {
      throw AuthError.BadAccessToken();
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

      return decoded as ITokenizeUser;
    } catch (e) {
      throw AuthError.BadAccessToken();
    }
  }

  async deleteToken({ userID, deviceName, refreshToken }: IDeleteToken) {
    const candidate = await prisma.auth.findFirst({
      where: {
        userID,
        deviceName,
        refreshToken,
      },
    });

    if (!candidate) {
      throw AuthError.AuthDataNotExists();
    }

    prisma.auth.deleteMany({
      where: {
        userID,
        deviceName,
        refreshToken,
      },
    });
  }

  async deleteAuthData({ id, userID }: IDeleteAuthData) {
    const candidate = await this.findOneByID(id);

    if (!candidate) {
      throw AuthError.AuthDataNotExists();
    }

    if (candidate.userID === userID) {
      prisma.auth.delete({
        where: {
          id,
          userID,
        },
      });
    }
  }
}

export default new AuthService();
