import { Router, Response } from 'express';
import { AuthRequest } from './../middlewares/is-authenticated';
import Controller from '../interfaces/controller.interface';
import IError from '../interfaces/error.interface';
import UserService from '../services/user.service';

interface IUserController extends Controller {
  // L clientAppointments(req: AuthRequest, res: Response): any;
  // masterAppointments(req: AuthRequest, res: Response): any;
  // createMasterService(req: AuthRequest, res: Response): any;
  // updateMasterService(req: AuthRequest, res: Response): any;
  // deleteMasterService(req: AuthRequest, res: Response): any;
  // updateProfile(req: AuthRequest, res: Response): any;
  becomeMaster(req: AuthRequest, res: Response): any;
  becomeClient(req: AuthRequest, res: Response): any;
}

class UserController implements IUserController {
  public router = Router();
  public path = '/user';

  constructor() {
    this.router.patch(`${this.path}/become/master`, this.becomeMaster);
    this.router.patch(`${this.path}/become/client`, this.becomeClient);
  }

  async becomeMaster(req: AuthRequest, res: Response<any, Record<string, any>>) {
    try {
      const {
        id,
      } = req.token;

      UserService.becomeMaster(id);

      res.sendStatus(200);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }

  async becomeClient(req: AuthRequest, res: Response<any, Record<string, any>>) {
    try {
      const {
        id,
      } = req.token;

      UserService.becomeClient(id);

      res.sendStatus(200);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }
}
