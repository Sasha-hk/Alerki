// Interfaces
import IError from '../interfaces/error.interface';
import Controller from '../interfaces/controller.interface';

// Errors
import UserError from '../errors/user.error';

// Middlewares
import isAuthenticated, { AuthRequest } from '../middlewares/is-authenticated';
import isMaster from '../middlewares/is-master';

// Services
import UserService from '../services/user.service';
import MasterProfileService from '../services/master-profile.service';
import { IPicture } from '../services/user-picture.service';

// Utils
import PrivateUserDto from '../utils/dto/private-user.dto';
import MasterProfileDto from '../utils/dto/master-profile.dto';
import Validator, { blanks } from '../utils/validator';

// Third-party packages
import { Router, Response } from 'express';
import MasterProfileError from '../errors/master-profile.error';

interface IUserController extends Controller {
  // L clientAppointments(req: AuthRequest, res: Response): any;
  // masterAppointments(req: AuthRequest, res: Response): any;
  // createMasterService(req: AuthRequest, res: Response): any;
  // updateMasterService(req: AuthRequest, res: Response): any;
  // deleteMasterService(req: AuthRequest, res: Response): any;
  updateProfile(req: AuthRequest, res: Response): any;
  updateMasterProfile(req: AuthRequest, res: Response): any;
  becomeMaster(req: AuthRequest, res: Response): any;
  becomeClient(req: AuthRequest, res: Response): any;
  getUser(req: AuthRequest, res: Response): any;
}

class UserController implements IUserController {
  public router = Router();
  public path = '/user';

  constructor() {
    this.router.patch(`${this.path}/become/master`, isAuthenticated, this.becomeMaster);
    this.router.patch(`${this.path}/become/client`, isAuthenticated, this.becomeClient);
    this.router.patch(`${this.path}/`, isAuthenticated, this.updateProfile);
    this.router.get(`${this.path}`, isAuthenticated, this.getUser);
    this.router.patch(`${this.path}/master`, isAuthenticated, isMaster, this.updateMasterProfile);
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
      console.log(e);
      res.status(e?.status || 500).json(e.error);
    }
  }

  async updateMasterProfile(req: AuthRequest, res: Response) {
    try {
      const { id } = req.token!;
      const { biography } = req.body;

      Validator.validate({
        biography: {
          value: biography,
          required: true,
          type: 'string',
          pattern: /\w{0,100}/,
        },
      });

      const userCandidate = await UserService.findUserByID(id);

      if (!userCandidate?.masterID) {
        throw MasterProfileError.NotFound();
      }

      const userData = await MasterProfileService.update(
        userCandidate?.masterID!,
        {
          biography,
        },
      );

      const userDto = new PrivateUserDto(userCandidate, userData);

      res.json(userDto);
    } catch (e: IError | any) {
      console.log(e);
      res.status(e?.status || 500).json(e.error);
    }
  }

  async getUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.token!;

      const userData = await UserService.findUserByID(id);

      if (!userData) {
        throw UserError.UserNotExists();
      }

      const userDto = new PrivateUserDto(userData);

      res.json(userDto);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }
}

export default UserController;
