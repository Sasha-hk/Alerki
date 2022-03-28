import jwt from 'jsonwebtoken';
import AuthError from '../errors/auth.error';
import { AuthModel } from '../db/models';

export interface ITokenizeUser {
  id: number;
  username: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IAuthService {
  findByDeviceName(deviceName: string): Promise<any>;
  generateTokens(userData: ITokenizeUser): Promise<ITokens>;
  saveToken(refreshToken: string, userID: number, deviceName: string): any;
  validateAccessToken(accessToken: string): any;
  validateRefreshToken(refreshToken: string): any;
}

/**
 * Authentication / authorization service
 */
class AuthService implements IAuthService {
  async findByDeviceName(deviceName: string): Promise<any> {
    return AuthModel.findOne({
      raw: true,
      where: {
        deviceName,
      },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<any> {
    // L return AuthModel.findOne({
    //   raw: true,
    //   where: {
    //     deviceName,
    //   },
    // });
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
}

export default new AuthService();
