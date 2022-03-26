import bcrypt from 'bcrypt';
import AuthError from '../errors/auth.error';
import AuthService from './auth.service';
import { UserModel } from '../db/models';

interface IRegister {
  username: string;
  email: string;
  password: string;
  profileType: 'client' | 'master';
  deviceName: string;
}

interface ILogIn {
  username?: string;
  email?: string;
  password: string;
}

interface IUserService {
  register({
    username,
    email,
    password,
    profileType,
  }: IRegister): any;

  logIn({
    username,
    email,
    password,
  }: ILogIn): any;

  logOut(): any;

  withGoogle(): any;
}

/**
 * User service
 */
class UserService implements IUserService {
  async findUserByEmail(email: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        email,
      },
    });
  }

  async findUserByUsername(username: string) {
    return UserModel.findOne({
      raw: true,
      where: {
        username,
      },
    });
  }

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

    const tokens = await AuthService.generateTokens({
      id: newUser.id,
      username,
      email,
    });

    AuthService.saveTokens(tokens, newUser.id, deviceName);
  }

  async logIn({
    username,
    email,
    password,
  }: ILogIn) {}

  async logOut() {}

  async withGoogle() {}
}

export default new UserService();
