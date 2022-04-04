import AuthService, { ITokenizeUser } from './../services/auth.service';
import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import Validator, { blanks } from '../utils/validator';
import IError from '../interfaces/error.interface';
import UserService from '../services/user.service';
import getDeviceName from '../utils/get-device-name';
import PrivateUserDto from '../utils/dto/private-user.dto';
import DevicesDto from '../utils/dto/devices.dto';
import isAuthenticated, { AuthRequest } from '../middlewares/is-authenticated';
import authenticateWithGoogle from '../oauth/google.oauth';

interface IAuthController extends Controller {
  register(req: Request, res: Response): any;
  logIn(req: Request, res: Response): any;
  logOut(req: Request, res: Response): any;
  withGoogle(req: Request, res: Response): any;
  getDevices(req: Request, res: Response): any;
  deleteDevice(req: Request, res: Response): any;
}

/**
 * Authentication controller
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
    this.router.get(`${this.path}/log-out`, isAuthenticated, this.logOut);
    this.router.get(`${this.path}/oauth/google`, this.withGoogle);
    this.router.get(`${this.path}/devices`, isAuthenticated, this.getDevices);
    this.router.delete(`${this.path}/device/:id`, isAuthenticated, this.deleteDevice);

    if (process.env.NODE_ENV === 'dev') {
      this.router.get(`${this.path}/oauth/test`, this.oauth);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        profileType,
      } = req.body;

      Validator.validate({
        ...blanks.usernameField(username, { required: true }),
        ...blanks.emailField(email, { required: true }),
        ...blanks.profileTypeField(profileType, { required: true }),
        ...blanks.passwordField(password, { required: true }),
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
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async logIn(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
      } = req.body;

      Validator.validate({
        ...blanks.passwordField(password, { required: true }),
        ...blanks.usernameField(username, { atLeastOne: true }),
        ...blanks.emailField(email, { atLeastOne: true }),
      });

      const deviceName = getDeviceName(req);

      const userData = email
        ? await UserService.logInByEmail({ email, password, deviceName })
        : await UserService.logInByUsername({ username, password, deviceName });

      const userDto = new PrivateUserDto(userData.user);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 60 * 60 * 1000 });

      res.json({
        ...userDto,
      });
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async logOut(req: AuthRequest, res: Response) {
    try {
      const {
        refreshToken,
      } = req.cookies;

      const {
        id,
      } = req.token!;

      const deviceName = getDeviceName(req);

      UserService.logOut({
        userID: id,
        deviceName,
        refreshToken,
      });

      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      res.sendStatus(200);
    } catch (e: IError | any) {
      console.log(e);
      res.status(e?.status || 500).json(e?.error);
    }
  }

  /**
   * !!!The method only for testing!!!
   */
  async oauth(req: Request, res: Response) {
    try {
      const path = 'https://accounts.google.com/o/oauth2/v2/auth?'
        + 'scope=https://www.googleapis.com/auth/userinfo.profile&'
        + 'access_type=offline&'
        + 'include_granted_scopes=true&'
        + 'response_type=code&'
        + 'state=state_parameter_passthrough_value&'
        + 'client_id=' + process.env.GOOGLE_CLIENT_ID + '&'
        + 'redirect_uri=' + process.env.GOOGLE_REDIRECT_URL;

      console.log(path);
      console.log(process.env.GOOGLE_REDIRECT_URL);

      res.send(`<a href="${path}">google</a>`);
    } catch (e: IError | any) {
      console.log(e);
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async withGoogle(req: Request, res: Response) {
    try {
      const { code } = req.query!;

      Validator.validate({
        code: {
          value: code,
          required: true,
        },
      });

      const data = await authenticateWithGoogle(code as string);

      const deviceName = getDeviceName(req);

      const userData = await UserService.withGoogle(data, deviceName);

      const userDto = new PrivateUserDto(userData.user);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 60 * 60 * 1000 });

      res.send({ ...userDto });
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async getDevices(req: AuthRequest, res: Response) {
    try {
      const {
        id,
      } = req.token!;

      const devices = await AuthService.findAllByUserID(id);

      const devicesDto = new DevicesDto(devices);

      res.json(devicesDto.devices).end();
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async deleteDevice(req: AuthRequest, res: Response) {
    try {
      const {
        id,
      } = req.params;

      Validator.validate({
        id: {
          value: id,
          pattern: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
          required: true,
        },
      });

      await AuthService.deleteAuthData({ id, userID: req.token?.id! });

      res.sendStatus(200);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }
}

export default AuthController;
