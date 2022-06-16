
import { Request } from 'express';
import { JWT } from '@Module/auth/interfaces/jwt.interface';

interface AuthRequest extends Request {
  user: {
    accessToken: string;
    refreshToken?: string;
    decodedAccessToken: JWT;
    decodedRefreshToken?: JWT;
  },
  [key: string]: any;
};

export default AuthRequest;
