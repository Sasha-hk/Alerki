import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import IError from '../interfaces/error.interface';
import { ServiceModel } from '../db/models';

interface IServiceController extends Controller {
  getServices(req: Request, res: Response): any;
}

/**
 * Services controller
 */
class ServiceController implements IServiceController {
  public path = '/service';
  public router = Router();

  constructor() {
    console.log(123);
  }

  async getServices(req: Request, res: Response) {
    try {
      const l = 12;
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }
}

export default ServiceController;
