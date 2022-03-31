import { Router, Request, Response } from 'express';
import Validator from '../utils/validator';
import Controller from '../interfaces/controller.interface';
import IError from '../interfaces/error.interface';
import ServiceError from '../errors/service.error';
import ServiceService from '../services/service.service';

interface IServiceController extends Controller {
  getServices(req: Request, res: Response): any;
}

/**
 * Services controller
 */
class ServiceController implements IServiceController {
  public path = '/services';
  public router = Router();

  constructor() {
    this.router.get(`${this.path}`, this.getServices);
  }

  async getServices(req: Request, res: Response) {
    try {
      const {
        name,
      } = req.query;

      Validator({
        all: [
          {
            value: name,
            name: 'name',
            type: 'string',
            maxLength: 30,
          },
        ],
      });

      const foundServices = await ServiceService.findAllByName(name as string);

      if (foundServices.length === 0) {
        throw ServiceError.NotFound();
      }

      res.json(foundServices);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }
}

export default ServiceController;
