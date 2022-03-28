import { Request, Response, NextFunction } from 'express';
import AuthError from '../errors/auth.error';
import IError from '../interfaces/error.interface';
import AuthService, { ITokenizeUser } from '../services/auth.service';

export interface AuthenticatedRequest extends Request {
  token: ITokenizeUser;
}

export default async function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    console.log('middleware is run');
    const accessToken = req.cookies;

    if (!accessToken) {
      throw AuthError.Unauthorized();
    }

    const decoded = AuthService.validateAccessToken(accessToken);

    req.push({ token: decoded });

    next(req);
  } catch (e: IError | any) {
    res.sendStatus(e?.status || 500).json(e?.errors);
  }
}
