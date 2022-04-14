// Interfaces
import IError from '../interfaces/error.interface';

import { Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import AuthError from '../errors/auth.error';
import isAuthenticated, { AuthRequest } from './is-authenticated';

export default async function isMaster(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const candidate = await UserService.findUserByID(req.token?.id!);

    if (candidate?.profileType !== 'master') {
      throw AuthError.NotMaster();
    }

    next();
  } catch (e: IError | any) {
    res.status(e?.status || 500).json(e.error);
  }
}
