import jwt from 'jsonwebtoken';
import { AuthModel } from '../db/models';

interface ITokenizeUser {
  id: number;
  username: string;
  email: string;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IAuthService {
  findByDeviceName(deviceName: string): Promise<any>;
  generateAccessToken(userData: ITokenizeUser): Promise<string>;
  generateRefreshToken(userDate: ITokenizeUser): Promise<string>;
  generateTokens(userData: ITokenizeUser): Promise<ITokens>;
  saveAccessToken(accessToken: string, userID: number, deviceName: string): any;
  saveRefreshToken(refreshToken: string, userID: number, deviceName: string): any;
  saveTokens(tokens: ITokens, userID: number, deviceName: string): any;
  validateAccessToken(): any;
  validateRefreshToken(): any;
  saveAuthData(): any;
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

  async generateAccessToken({
    id,
    username,
    email,
  }: ITokenizeUser) {
    const accessToken = jwt.sign(
      {
        id,
        username,
        email,
      },
      process.env.JWT_ACCESS_SECRET as string,
    );

    return accessToken;
  }

  async generateRefreshToken({
    id,
    username,
    email,
  }: ITokenizeUser) {
    const accessToken = jwt.sign(
      {
        id,
        username,
        email,
      },
      process.env.JWT_REFRESH_SECRET as string,
    );

    return accessToken;
  }

  async generateTokens({
    id,
    username,
    email,
  }: ITokenizeUser) {
    return {
      accessToken: await this.generateAccessToken({ id, username, email }),
      refreshToken: await this.generateRefreshToken({ id, username, email }),
    } as ITokens;
  }

  async saveAccessToken(accessToken: string, userID: number, deviceName: string) {

  }

  async saveRefreshToken(refreshToken: string, userID: number, deviceName: string) {

  }

  async saveTokens(tokens: ITokens, userID: number, deviceName: string) {

  }

  validateAccessToken() {}

  validateRefreshToken() {}

  saveAuthData() {}
}

export default new AuthService();
