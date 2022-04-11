// Errors
import AuthError from '../errors/auth.error';
import UserError from '../errors/user.error';

// Interfaces
import { IGoogleResponse } from '../oauth/google.oauth';

// Models
import { UserModel, UserPictureModel, MasterProfileModel } from '../db/models';

// Services
import AuthService, { ITokens } from './auth.service';
import UserPictureService, { IPicture } from './user-picture.service';
import ClientProfileService from './client-profile.service';
import MasterProfileService from './master-profile.service';

// Third-party packages
import bcrypt from 'bcrypt';
import axios from 'axios';

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

interface IUpdateUser {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  picture: IPicture,
}

interface IUserService {
  findUserByUsername(username: string): Promise<UserModel | null>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  findUserByID(id: string): Promise<UserModel | null>;
  findUserByPhoneNumber(id: string): Promise<UserModel | null>;
  register({ username, email, password, profileType }: IRegister): Promise<ITokens>;
  logInByUsername({ username, password, deviceName }: ILogInByUsername): any;
  logInByEmail({ email, password, deviceName }: ILogInByEmail): any;
  logOut({ refreshToken, deviceName, userID }: ILogOut): void;
  withGoogle(data: IGoogleResponse, deviceName: string): any;
  becomeMaster(id: string): Promise<void>;
  becomeClient(id: string): Promise<void>;
  updateUser(id: string, { firstName, lastName, phoneNumber }: IUpdateUser): Promise<UserModel>;
}

/**
 * User service
 */
class UserService implements IUserService {
  /**
   * Find user by email
   * @param email User email to find
   * @returns User if exists
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
   * @returns User if exists
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
   * @param id User ID
   * @returns User if exists
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
   * Find user by phone number
   * @param phoneNumber User phone number to find
   * @returns User if exists
   */
  async findUserByPhoneNumber(phoneNumber: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        phoneNumber,
      },
    });
  }

  /**
   * Try to register the user, if possible make it and return new user and the tokens
   * @param options Information required to register an user
   * @returns  User and tokens
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

    // Create client and master profile if required
    const clientProfileID = (await ClientProfileService.createProfile()).id;
    let masterProfileID: string | null = null;

    if (profileType === 'master') {
      masterProfileID = (await MasterProfileService.createProfile()).id;
    }

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profileType,
      clientID: clientProfileID,
      masterID: masterProfileID,
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

  /**
   * Log-in user by username
   * @param options Log-in data
   * @returns User and tokens
   */
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

  /**
   * Log-in user by email
   * @param options Log-in data
   * @returns User and tokens
   */
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

  /**
   * Log-out user
   * @param options Data to log-out
   */
  async logOut({ userID, deviceName, refreshToken }: ILogOut) {
    AuthService.deleteToken({ userID, deviceName, refreshToken });
  }

  /**
   * Log-in / register user with Google
   * @param data Google response data
   * @param deviceName Device name
   * @returns UserModel
   */
  async withGoogle(data: IGoogleResponse, deviceName: string) {
    const candidate = await this.findUserByEmail(data.decoded.email);

    // If user not exists then create new user
    if (!candidate) {
      const userData = data.decoded;

      // Save picture
      let pictureID: string | null = null;

      if (userData.picture) {
        const userPictureResponse = await axios.get(
          userData.picture,
          {
            responseType: 'arraybuffer',
          },
        );

        pictureID = (await UserPictureModel.create({
          picture: userPictureResponse.data,
        })).id;
      }

      // Create client and master profile if required
      const clientID = (await ClientProfileService.createProfile()).id;
      let masterID: string | null = null;

      if (data?.profileType === 'master') {
        masterID = (await MasterProfileService.createProfile()).id;
      }

      const newUser = await UserModel.create({
        username: userData.email.split('@')[0],
        email: userData.email,
        profileType: 'client',
        pictureID,
        clientID,
        masterID,
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

  /**
   * Make the user a master
   * @param id User ID to become master
   */
  async becomeMaster(id: string) {
    const candidate = await UserModel.findOne({
      raw: true,
      where: {
        id,
      },
    });

    if (!candidate) {
      throw UserError.UserNotExists();
    }

    // If master profile not exists create it
    let masterID: string | null = candidate?.masterID;

    if (!masterID) {
      masterID = (await MasterProfileService.createProfile()).id;
    }

    // Unblock master profile if blocked
    await MasterProfileService.unblock(masterID);

    // Change profile type
    if (candidate?.profileType === 'client') {
      UserModel.update(
        {
          profileType: 'master',
          masterID,
        },
        {
          where: {
            id,
          },
        },
      );
    }
  }

  /**
   * Make the user a client
   * @param id User ID to become client
   */
  async becomeClient(id: string) {
    const candidate = await UserModel.findOne({
      raw: true,
      where: {
        id,
      },
    });

    if (!candidate) {
      throw UserError.UserNotExists();
    }

    // Block master profile
    if (candidate?.masterID) {
      await MasterProfileService.block(candidate.masterID);
    }

    if (candidate?.profileType === 'master') {
      UserModel.update(
        {
          profileType: 'client',
        },
        {
          where: {
            id,
          },
        },
      );
    }
  }

  /**
   * Update user
   * @param id User ID to update
   * @param options Update data
   * @returns UserModel
   */
  async updateUser(id: string, { firstName, lastName, phoneNumber, picture }: IUpdateUser) {
    const candidate = await this.findUserByID(id);

    if (!candidate) {
      throw UserError.UserNotExists();
    }

    // Check if phone number not exists
    if (phoneNumber) {
      const checkPhoneNumber = await this.findUserByPhoneNumber(phoneNumber);

      if (checkPhoneNumber && checkPhoneNumber.id !== candidate.id) {
        throw UserError.UserPhoneNumberExists();
      }
    }

    // Prepare picture ID
    let userPictureID: string | null = candidate.pictureID || null;
    if (picture) {
      if (candidate.pictureID) {
        UserPictureService.updatePicture(candidate.pictureID, picture);
      } else {
        userPictureID = (await UserPictureService.createPicture(picture)).id;
      }
    }

    if (firstName || lastName || phoneNumber || userPictureID) {
      await UserModel.update(
        {
          firstName,
          lastName,
          phoneNumber,
          pictureID: userPictureID,
        },
        {
          where: {
            id,
          },
        },
      );
    }

    return await this.findUserByID(id) as UserModel;
  }
}

export default new UserService();
