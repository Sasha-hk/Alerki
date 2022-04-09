import bcrypt from 'bcrypt';
import axios from 'axios';
import AuthError from '../errors/auth.error';
import AuthService from './auth.service';
import { UserModel, UserPictureModel } from '../db/models';
import { ITokens } from './auth.service';
import { IGoogleResponse } from '../oauth/google.oauth';
import UserError from '../errors/user.error';

interface IRegister {
  username: string;
  email: string;
  password: string;
  profileType: 'client' | 'master';
  deviceName: string;
}

interface ILogIn {
  password: string;
  deviceName: string,
}
interface ILogInByUsername extends ILogIn {
  username: string;
}

interface ILogInByEmail extends ILogIn {
  email: string;
}

export interface ILogOut {
  userID: string,
  deviceName: string,
  refreshToken: string,
}

interface IUserService {
  findUserByUsername(username: string): Promise<UserModel | null>
  findUserByEmail(email: string): Promise<UserModel | null>
  findUserByID(id: string): Promise<UserModel | null>
  register({
    username,
    email,
    password,
    profileType,
  }: IRegister): Promise<ITokens>;
  logInByUsername({ username, password, deviceName }: ILogInByUsername): any;
  logInByEmail({ email, password, deviceName }: ILogInByEmail): any;
  logOut({ refreshToken, deviceName, userID }: ILogOut): void;
  withGoogle(data: IGoogleResponse, deviceName: string): any;
  becomeMaster(userID: string): Promise<void>;
  becomeClient(userID: string): Promise<void>;
}

/**
 * User service
 */
class UserService implements IUserService {
  /**
   * Find user by email
   * @param {string} email User email to find
   * @returns {UserModel | null} User if exists
   */
  async findUserByEmail(email: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        email,
      },
    });
  }

  /**
   * Find user by username
   * @param username Username to find
   * @returns {UserModel | null} User if exists
   */
  async findUserByUsername(username: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        username,
      },
    });
  }

  /**
   * Find user by username
   * @param username Username to find
   * @returns {UserModel | null} User if exists
   */
  async findUserByID(id: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  /**
   * Try to register the user, if possible make it and return new user and the tokens
   * @param {IRegister} into Information required to register an user
   * @returns {object} Return user and tokens
   */
  async register({
    username,
    email,
    password,
    profileType,
    deviceName,
  }: IRegister) {
    // Check if email already not exists
    if (await this.findUserByEmail(email)) {
      throw AuthError.EmailExists();
    }

    // Check if username already not exists
    if (await this.findUserByUsername(username)) {
      throw AuthError.UsernameExists();
    }

    // Prepare password
    const hashedPassword = bcrypt.hashSync(password, 1);

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profileType,
    });

    // Generate tokens
    const tokens = await AuthService.generateTokens({
      id: newUser.id,
      username,
      email,
    });

    // Save tokens
    AuthService.saveToken(tokens.refreshToken, newUser.id, deviceName);

    return {
      user: newUser,
      ...tokens,
    };
  }

  async logInByUsername({ username, password, deviceName }: ILogInByUsername) {
    const candidate = await this.findUserByUsername(username);

    if (!candidate) {
      throw AuthError.UsernameNotExists();
    }

    if (!bcrypt.compareSync(password, candidate.password)) {
      throw AuthError.BadPassword();
    }

    // Generate tokens
    const tokens = await AuthService.generateTokens({
      id: candidate.id,
      username: candidate.username,
      email: candidate.email,
    });

    // Save tokens
    AuthService.saveToken(tokens.refreshToken, candidate.id, deviceName);

    return {
      user: candidate,
      ...tokens,
    };
  }

  async logInByEmail({ email, password, deviceName }: ILogInByEmail) {
    const candidate = await this.findUserByEmail(email);

    if (!candidate) {
      throw AuthError.UsernameNotExists();
    }

    if (!bcrypt.compareSync(password, candidate.password)) {
      throw AuthError.BadPassword();
    }

    // Generate tokens
    const tokens = await AuthService.generateTokens({
      id: candidate.id,
      username: candidate.username,
      email: candidate.email,
    });

    // Save tokens
    AuthService.saveToken(tokens.refreshToken, candidate.id, deviceName);

    return {
      user: candidate,
      ...tokens,
    };
  }

  async logOut({ userID, deviceName, refreshToken }: ILogOut) {
    AuthService.deleteToken({ userID, deviceName, refreshToken });
  }

  async withGoogle(data: IGoogleResponse, deviceName: string) {
    const candidate = await this.findUserByEmail(data.decoded.email);

    // If user not exists then create new user
    if (!candidate) {
      const userData = data.decoded;

      const userPictureResponse = await axios.get(
        userData.picture,
        {
          responseType: 'arraybuffer',
        },
      );

      const newUserPicture = await UserPictureModel.create({
        picture: userPictureResponse.data,
      });

      const newUser = await UserModel.create({
        username: userData.email.split('@')[0],
        email: userData.email,
        profileType: 'client',
        pictureID: newUserPicture.id,
      });

      const tokens = await AuthService.generateTokens({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });

      // Save tokens
      AuthService.saveToken(tokens.refreshToken, newUser.id, deviceName, {
        googleAccessToken: data.access_token,
        googleRefreshToken: data.refresh_token,
      });

      return {
        user: newUser,
        ...tokens,
      };
    }

    const tokens = await AuthService.generateTokens({
      id: candidate.id,
      username: candidate.username,
      email: candidate.email,
    });

    // Save tokens
    AuthService.saveToken(tokens.refreshToken, candidate.id, deviceName);

    return {
      user: candidate,
      ...tokens,
    };
  }

  async becomeMaster(userID: string) {
    const candidate = await UserModel.findOne({
      raw: true,
      where: {
        userID,
      },
    });

    if (!candidate) {
      throw UserError.UserNotExists();
    }

    if (candidate?.profileType === 'client') {
      UserModel.update(
        {
          profileType: 'master',
        },
        {
          where: {
            userID,
          },
        },
      );
    }
  }

  async becomeClient(userID: string) {
    const candidate = await UserModel.findOne({
      raw: true,
      where: {
        userID,
      },
    });

    if (!candidate) {
      throw UserError.UserNotExists();
    }

    if (candidate?.profileType === 'master') {
      UserModel.update(
        {
          profileType: 'client',
        },
        {
          where: {
            userID,
          },
        },
      );
    }
  }
}

export default new UserService();
