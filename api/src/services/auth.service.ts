import jwt from 'jsonwebtoken';
import AuthError from '../errors/auth.error';
import { AuthModel } from '../db/models';
import { ILogOut } from './user.service';

export interface ITokenizeUser {
  id: number;
  username: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IDeleteToken extends ILogOut {}

interface IAuthService {
  findByUserID(userID: number): Promise<AuthModel | null>;
  generateTokens(userData: ITokenizeUser): Promise<ITokens>;
  saveToken(refreshToken: string, userID: number, deviceName: string): any;
  validateAccessToken(accessToken: string): any;
  validateRefreshToken(refreshToken: string): any;
  deleteToken({ userID, deviceName, refreshToken }: IDeleteToken): void;
}

/**
 * Authentication / authorization service
 */
class AuthService implements IAuthService {
  async findByUserID(userID: number): Promise<AuthModel | null> {
    return AuthModel.findOne({
      raw: true,
      where: {
        userID,
      },
    });
  }

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

  async saveToken(refreshToken: string, userID: number, deviceName: string) {
    const candidate = await AuthModel.findOne({
      raw: true,
      where: {
        userID,
        deviceName,
      },
    });

    if (candidate) {
      AuthModel.update(
        {
          refreshToken,
        },
        {
          where: {
            deviceName,
          },
        },
      );
    } else {
      AuthModel.create({
        userID,
        deviceName,
        refreshToken,
      });
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

      return decoded;
    } catch (e) {
      throw AuthError.BadAccessToken();
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

      return decoded;
    } catch (e) {
      throw AuthError.BadAccessToken();
    }
  }

  async deleteToken({ userID, deviceName, refreshToken }: IDeleteToken) {
    const candidate = await AuthModel.findOne({
      raw: true,
      where: {
        userID,
        deviceName,
        refreshToken,
      },
    });

    if (!candidate) {
      throw AuthError.AuthDataNotExists();
    }

    AuthModel.destroy({
      where: {
        userID,
        deviceName,
        refreshToken,
      },
    });
  }
}

export default new AuthService();
