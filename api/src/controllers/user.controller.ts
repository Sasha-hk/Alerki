import { Router, Response } from 'express';
import { AuthRequest } from './../middlewares/is-authenticated';
import Controller from '../interfaces/controller.interface';
import IError from '../interfaces/error.interface';

interface IUserController extends Controller {
  // ClientAppointments(req: AuthRequest, res: Response): any;
  // MasterAppointments(req: AuthRequest, res: Response): any;
  // CreateMasterService(req: AuthRequest, res: Response): any;
  // UpdateMasterService(req: AuthRequest, res: Response): any;
  // DeleteMasterService(req: AuthRequest, res: Response): any;
  // UpdateProfile(req: AuthRequest, res: Response): any;
  BecomeMaster(req: AuthRequest, res: Response): any;
  BecomeClient(req: AuthRequest, res: Response): any;
}

class UserController implements IUserController {
  public router = Router();
  public path = '/user';

  constructor() {
    this.router.patch(`${this.path}/become/master`, this.BecomeMaster);
    this.router.patch(`${this.path}/become/client`, this.BecomeClient);
  }

  async BecomeMaster(req: AuthRequest, res: Response<any, Record<string, any>>) {
    try {
      console.log(req);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }

  async BecomeClient(req: AuthRequest, res: Response<any, Record<string, any>>) {
    try {
      console.log(req);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }
}
