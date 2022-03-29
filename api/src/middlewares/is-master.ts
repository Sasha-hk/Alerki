import { Response, NextFunction } from 'express';
import { UserModel } from '../db/models';
import AuthError from '../errors/auth.error';
import isAuthenticated, { AuthRequest } from './is-authenticated';

export default async function isMaster(req: AuthRequest, res: Response, next: NextFunction) {
  await isAuthenticated(req, res, next);

  const user = await UserModel.findOne({
    raw: true,
    attributes: [
      'profileType',
    ],
    where: {
      id: req.token.id,
    },
  });

  if (user.profileType !== 'master') {
    throw AuthError.NotMaster();
  }
}
