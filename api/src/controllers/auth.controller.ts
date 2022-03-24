import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import Validator from '../utils/validator';
import IError from '../interfaces/error.interface';
// I import { UerMode, AuthModel } from '../db/models';

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

  private register(req: Request, res: Response) {
    try {
      const {
        username,
        email,
      } = req.body;

      Validator({
        atLeastOne: [
          {
            value: username,
            name: 'username',
            type: 'string',
          },
          {
            value: email,
            name: 'email',
          },
        ],
      });

      res.send('OK');
    } catch (e: IError | any) {
      console.log(e.error);
      res.status(e?.status || 500).json(e?.error);
    }
  }

  private logIn(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  private logOut(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }

  private withGoogle(req: Request, res: Response) {
    try {
      console.log(req, res);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthController;
