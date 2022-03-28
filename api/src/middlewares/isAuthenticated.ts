import { Request, Response, NextFunction } from 'express';
import AuthError from '../errors/auth.error';
import IError from '../interfaces/error.interface';
import AuthService, { ITokenizeUser } from '../services/auth.service';

export interface AuthRequest extends Request {
  token?: ITokenizeUser | null;
}

export default async function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies;

    if (!accessToken) {
      throw AuthError.Unauthorized();
    }

    const decoded = AuthService.validateAccessToken(accessToken) as ITokenizeUser;

    req.token = decoded || null;

    next();
  } catch (e: IError | any) {
    res.sendStatus(e?.status || 500).json(e?.errors);
  }
}
