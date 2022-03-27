import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import Validator from '../utils/validator';
import IError from '../interfaces/error.interface';
import UserService from '../services/user.service';
import getDeviceName from '../utils/deviceName';
import PrivateUserDto from '../utils/dto/private-user.dto';

interface IAuthController extends Controller {
  register(req: Request, res: Response): any;
  logIn(req: Request, res: Response): any;
  logOut(req: Request, res: Response): any;
  withGoogle(req: Request, res: Response): any;
  getDevices(req: Request, res: Response): any;
  deleteDevice(req: Request, res: Response): any;
}

/**
 * Implements authentication logic
 */
class AuthController implements IAuthController {
  public path = '/auth';
  public router = Router();

  /**
   * Authentication controller constructor
   */
  constructor() {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/log-in`, this.logIn);
    this.router.get(`${this.path}/log-out`, this.logOut);
    this.router.get(`${this.path}/oauth/google`, this.withGoogle);
  }

  async register(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        profileType,
      } = req.body;

      Validator({
        all: [
          {
            value: username,
            name: 'username',
            type: 'string',
            maxLength: 20,
            minLength: 4,
          },
          {
            value: email,
            name: 'email',
            type: 'string',
            pattern: /^\w+@\w+\.\w+/,
            maxLength: 100,
            minLength: 3,
          },
          {
            value: password,
            name: 'password',
            type: 'string',
            minLength: 4,
            maxLength: 100,
          },
          {
            value: profileType,
            name: 'profileType',
            type: 'string',
            pattern: /(client|master)/,
          },
        ],
      });

      const deviceName = getDeviceName(req);

      const userData = await UserService.register({
        username,
        email,
        password,
        profileType,
        deviceName,
      });

      const userDto = new PrivateUserDto(userData.user);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 60 * 60 * 1000 });

      res.json({
        ...userDto,
      });
    } catch (e: IError | any) {
      console.log(e);
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async logIn(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  async logOut(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  async withGoogle(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  async getDevices(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteDevice(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthController;
