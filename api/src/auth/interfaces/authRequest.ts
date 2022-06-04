import { Request } from 'express';

interface AuthRequest extends Request {
  user: { [key: string]: any },
};

export default AuthRequest;
