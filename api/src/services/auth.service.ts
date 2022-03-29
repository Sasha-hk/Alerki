import jwt from 'jsonwebtoken';
import AuthError from '../errors/auth.error';
import { AuthModel } from '../db/models';
import { ILogOut } from './user.service';

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
  findAllByUserID(userID: string): Promise<AuthModel[]>;
  findOneByUserID(userID: string): Promise<AuthModel | null>;
  findOneByID(id: number): Promise<AuthModel | null>;
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
   * @returns {AuthModel[]} Auth data array
   */
  async findAllByUserID(userID: string): Promise<AuthModel[]> {
    return AuthModel.findAll({
      raw: true,
      where: {
        userID,
      },
    });
  }

  /**
   * Find one auth data by user id
   * @param userID User id
   * @returns {AuthModel[]} Auth data
   */
  async findOneByUserID(userID: string): Promise<AuthModel | null> {
    return AuthModel.findOne({
      raw: true,
      where: {
        userID,
      },
    });
  }

  /**
   * Find one auth data by id
   * @param id Auth data id
   * @returns {AuthModel | null} Auth data if exists
   */
  async findOneByID(id: number): Promise<AuthModel | null> {
    return AuthModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  /**
   * Generate access and refresh tokens
   * @param {ITokenizeUser} object Data required to generate token
   * @returns {ITokens} Access and refresh tokens
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
            ...options,
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

  async deleteAuthData({ id, userID }: IDeleteAuthData) {
    const candidate = await this.findOneByUserID(id);

    if (!candidate) {
      throw AuthError.AuthDataNotExists();
    }

    if (candidate.userID === userID) {
      AuthModel.destroy({
        where: {
          id,
          userID,
        },
      });
    }
  }
}

export default new AuthService();
