import { Router, Response } from 'express';
import isAuthenticated, { AuthRequest } from '../middlewares/is-authenticated';
import Controller from '../interfaces/controller.interface';
import IError from '../interfaces/error.interface';
import UserService from '../services/user.service';
import PrivateUserDto from '../utils/dto/private-user.dto';
import Validator, { blanks } from '../utils/validator';
import { IPicture } from '../services/user-picture.service';

interface IUserController extends Controller {
  // L clientAppointments(req: AuthRequest, res: Response): any;
  // masterAppointments(req: AuthRequest, res: Response): any;
  // createMasterService(req: AuthRequest, res: Response): any;
  // updateMasterService(req: AuthRequest, res: Response): any;
  // deleteMasterService(req: AuthRequest, res: Response): any;
  updateProfile(req: AuthRequest, res: Response): any;
  becomeMaster(req: AuthRequest, res: Response): any;
  becomeClient(req: AuthRequest, res: Response): any;
}

class UserController implements IUserController {
  public router = Router();
  public path = '/user';

  constructor() {
    this.router.patch(`${this.path}/become/master`, isAuthenticated, this.becomeMaster);
    this.router.patch(`${this.path}/become/client`, isAuthenticated, this.becomeClient);
    this.router.patch(`${this.path}/profile`, isAuthenticated, this.updateProfile);
  }

  async becomeMaster(req: AuthRequest, res: Response<any, Record<string, any>>) {
    try {
      const { id } = req.token!;

      await UserService.becomeMaster(id);

      res.sendStatus(200);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }

  async becomeClient(req: AuthRequest, res: Response) {
    try {
      const { id } = req.token!;

      await UserService.becomeClient(id);

      res.sendStatus(200);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { id } = req.token!;
      const {
        firstName,
        lastName,
        phoneNumber,
      } = req.body;
      const picture = (req.files?.picture as any) as IPicture;

      Validator.validate({
        ...blanks.phoneNumberField(phoneNumber, { atLeastOne: true }),
        ...blanks.firstNameField(firstName, { atLeastOne: true }),
        ...blanks.lastNameField(lastName, { atLeastOne: true }),
        ...blanks.userPictureField(picture?.data, { atLeastOne: true, type: 'object' }),
      });

      const userData = await UserService.updateUser(
        id,
        {
          firstName,
          lastName,
          phoneNumber,
          picture,
        },
      );

      const userDto = new PrivateUserDto(userData);

      res.json(userDto);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }
}

export default UserController;
