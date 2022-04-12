// Interfaces
import IError from '../interfaces/error.interface';
import Controller from '../interfaces/controller.interface';

// Middlewares
import isAuthenticated, { AuthRequest } from '../middlewares/is-authenticated';

// Services
import UserService from '../services/user.service';
import { IPicture } from '../services/user-picture.service';

// Utils
import PrivateUserDto from '../utils/dto/private-user.dto';
import Validator, { blanks } from '../utils/validator';

// Third-party packages
import { Router, Response } from 'express';

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

      const userData = await UserService.becomeMaster(id);

      const userDto = new PrivateUserDto(userData);

      res.json(userDto);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e.error);
    }
  }

  async becomeClient(req: AuthRequest, res: Response) {
    try {
      const { id } = req.token!;

      const userData = await UserService.becomeClient(id);

      const userDto = new PrivateUserDto(userData);

      res.json(userDto);
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
        biography,
      } = req.body;
      const picture = (req.files?.picture as any) as IPicture;

      Validator.validate({
        ...blanks.phoneNumberField(phoneNumber, { atLeastOne: true }),
        ...blanks.firstNameField(firstName, { atLeastOne: true }),
        ...blanks.lastNameField(lastName, { atLeastOne: true }),
        ...blanks.userPictureField(picture?.data, { atLeastOne: true, type: 'object' }),
        biography: {
          value: biography,
          atLeastOne: true,
          type: 'string',
          pattern: /\w{0,100}/,
        },
      });

      const userData = await UserService.updateUser(
        id,
        {
          firstName,
          lastName,
          phoneNumber,
          picture,
          biography,
        },
      );

      const userDto = new PrivateUserDto(userData);

      res.json(userDto);
    } catch (e: IError | any) {
      console.log(e.error);
      res.status(e?.status || 500).json(e.error);
    }
  }
}

export default UserController;
