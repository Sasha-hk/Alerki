// Interfaces
import IError from '../interfaces/error.interface';
import Controller from '../interfaces/controller.interface';

// Errors
import UserError from '../errors/user.error';
import AuthError from '../errors/auth.error';

// Middlewares
import isAuthenticated, { AuthRequest } from '../middlewares/is-authenticated';
import isMaster from '../middlewares/is-master';

// Services
import UserService from '../services/user.service';
import MasterProfileService from '../services/master-profile.service';
import MasterServiceService from '../services/master-service.service';
import { IPicture } from '../services/user-picture.service';

// Utils
import PrivateUserDto from '../utils/dto/private-user.dto';
import Validator, { blanks } from '../utils/validator';

// Third-party packages
import { Router, Response } from 'express';
import MasterProfileError from '../errors/master-profile.error';

interface IUserController extends Controller {
  createMasterService(req: AuthRequest, res: Response): any;
  updateMasterService(req: AuthRequest, res: Response): any;
  deleteMasterService(req: AuthRequest, res: Response): any;
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
    this.router.post(`${this.path}/master/service`, isAuthenticated, isMaster, this.createMasterService);
    this.router.patch(`${this.path}/master/service:serviceID`, isAuthenticated, isMaster, this.updateMasterService);
    this.router.delete(`${this.path}/master/service:serviceID`, isAuthenticated, isMaster, this.deleteMasterService);
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
      const {
        biography,
        startTime,
        endTime,
        delayBefore,
        delayAfter,
        weekendDays,
      } = req.body;

      Validator.validate({
        biography: {
          value: biography,
          required: true,
          type: 'string',
          pattern: /\w{0,100}/,
        },
      });

      const updateOptions = {
        biography,
      };

      const userCandidate = await UserService.findUserByID(id);

      if (!userCandidate?.masterID) {
        throw MasterProfileError.NotFound();
      }

      // Check if pass at least one params for master profile
      if (startTime || endTime || delayBefore || delayAfter || weekendDays) {
        // Check if profile type is master
        if (userCandidate.profileType !== 'master') {
          throw AuthError.NotMaster();
        }

        Validator.validate({
          startTime: {
            value: startTime,
            required: true,
            type: 'number',
          },
          endTime: {
            value: endTime,
            required: true,
            type: 'number',
          },
        });

        Object.assign(updateOptions, {
          startTime,
          endTime,
        });

        if (delayBefore || delayAfter) {
          Validator.validate({
            delayBefore: {
              value: delayBefore,
              required: true,
              type: 'number',
            },
            delayAfter: {
              value: delayAfter,
              required: true,
              type: 'number',
            },
          });

          Object.assign(updateOptions, {
            delayBefore,
            delayAfter,
          });
        }

        if (weekendDays) {
          Object.assign(updateOptions, { weekendDays });
        }
      }

      const userData = await MasterProfileService.update(userCandidate?.masterID!, updateOptions);

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

  async createMasterService(req: AuthRequest, res: Response) {
    try {
      const {
        serviceID,
        masterID,
        duration,
        price,
        currency,
        locationLat,
        locationLng,
      } = req.body;

      Validator.validate({
        ...blanks.uuidField(serviceID, { required: true }),
        ...blanks.uuidField(masterID, { required: true }),
        duration: {
          value: duration,
          type: 'number',
          required: true,
        },
        price: {
          value: price,
          type: 'number',
          required: true,
        },
        currency: {
          value: currency,
          type: 'string',
          required: true,
        },
        locationLat: {
          value: locationLat,
          type: 'number',
          required: true,
        },
        locationLng: {
          value: locationLng,
          type: 'number',
          required: true,
        },
      });

      const serviceData = await MasterServiceService.create({
        serviceID,
        masterID,
        duration,
        price,
        currency,
        locationLat,
        locationLng,
      });

      res.json(serviceData);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async updateMasterService(req: AuthRequest, res: Response) {
    try {
      const {
        duration,
        price,
        currency,
        locationLat,
        locationLng,
      } = req.body;
      const { serviceID } = req.params;

      const master = await UserService.findUserByID(req.token?.id!);

      if (!master) {
        throw MasterProfileError.NotFound();
      }

      Validator.validate({
        ...blanks.uuidField(serviceID, { required: true }),
        duration: {
          value: duration,
          type: 'number',
          required: true,
        },
        price: {
          value: price,
          type: 'number',
          required: true,
        },
        currency: {
          value: currency,
          type: 'string',
          required: true,
        },
        locationLat: {
          value: locationLat,
          type: 'number',
          required: true,
        },
        locationLng: {
          value: locationLng,
          type: 'number',
          required: true,
        },
      });

      const serviceData = await MasterServiceService.update(master.id, serviceID, {
        duration,
        price,
        currency,
        locationLat,
        locationLng,
      });

      res.json(serviceData);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }

  async deleteMasterService(req: AuthRequest, res: Response) {
    try {
      const { serviceID } = req.params;

      const master = await UserService.findUserByID(req.token?.id!);

      if (!master) {
        throw MasterProfileError.NotFound();
      }

      Validator.validate({
        ...blanks.uuidField(serviceID, { required: true }),
      });

      const serviceData = await MasterServiceService.delete(master.id, serviceID);

      res.json(serviceData);
    } catch (e: IError | any) {
      res.status(e?.status || 500).json(e?.error);
    }
  }
}

export default UserController;
