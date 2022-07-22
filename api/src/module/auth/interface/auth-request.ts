import { Request } from 'express';

import { JwtTokenData } from '@Module/auth/interface/jwt.interface';

export interface AuthRequestToken {
  raw: string,
  decoded: JwtTokenData,
}

export interface AuthRequest extends Request {
  user: {
    tokens: {
      accessToken: AuthRequestToken,
      refreshToken?: AuthRequestToken,
    }
  } | undefined
};
