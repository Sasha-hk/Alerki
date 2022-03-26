import jwt from 'jsonwebtoken';
import { AuthModel } from '../db/models';

interface IAuthService {
  validateAccessToken(): any;
  validateRefreshToken(): any;
  saveAuthData(): any;
}

/**
 * Authentication / authorization service
 */
class AuthService implements IAuthService {
  validateAccessToken() {}

  validateRefreshToken() {}

  saveAuthData() {}
}

export default new AuthService();
