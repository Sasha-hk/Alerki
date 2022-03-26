import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import Validator from '../utils/validator';
import IError from '../interfaces/error.interface';
import UserService from '../services/user.service';

/**
 * Implements authentication logic
 */
class AuthController implements Controller {
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

      const newUser = await UserService.register({
        username,
        email,
        password,
        profileType,
      });

      res.send('OK');
    } catch (e: IError | any) {
      console.log(e.error);
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
}

export default AuthController;
