import HttpError from './http.error';
import IError from '../interfaces/error.interface';

/**
 * Authentication / Authorization error
 */
class AuthError extends HttpError {
  /**
   * Auth error constructor
   * @param {number=} status Error code
   * @param {string=} message Console message
   * @param {IError=} error Response error description
   */
  constructor(status: number = 400, message: string = 'Validation error', error?: IError) {
    super(status, message, error);
  }

  /**
   * Invalid access token error
   * @returns {HttpError} Error
   */
  static BadAccessToken(): HttpError {
    throw new HttpError(400, 'Invalid access token', { error: 'invalid access token' });
  }

  /**
   * Invalid refresh token error
   * @returns {HttpError} Error
   */
  static BadRefreshToken(): HttpError {
    throw new HttpError(400, 'Invalid refresh token', { error: 'invalid refresh token' });
  }

  /**
   * User not authenticated error
   * @returns {HttpError} Error
   */
  static Unauthorized(): HttpError {
    throw new HttpError(401, 'User not authorized', { error: 'not authorized' });
  }

  /**
   * Bad password error
   * @returns {HttpError} Error
   */
  static BadPassword(): HttpError {
    throw new HttpError(400, 'Bad password', { error: 'bad password' });
  }

  /**
   * Username not exists error
   * @returns {HttpError} Error
   */
  static UsernameNotExists(): HttpError {
    throw new HttpError(
      400,
      'Username not exists',
      { error: 'username not exists' },
    );
  }

  /**
   * Username exists error
   * @returns {HttpError} Error
   */
  static UsernameExists(): HttpError {
    throw new HttpError(
      400,
      'Username already exists',
      { error: 'username already exists' },
    );
  }

  /**
   * Email exists error
   * @returns {HttpError} Error
   */
  static EmailExists(): HttpError {
    throw new HttpError(400, 'Email already exists', { error: 'email already exists' });
  }

  /**
   * Email not exists error
   * @returns {HttpError} Error
   */
  static EmailNotExists(): HttpError {
    throw new HttpError(400, 'Email not exists', { error: 'email not exists' });
  }

  /**
   * User is not a master
   * @returns {HttpError} Error
   */
  static NotMaster(): HttpError {
    throw new HttpError(400, 'User is not master', { error: 'user is not a master' });
  }

  /**
   * Auth data not exists
   * @returns {HttpError} Error
   */
  static AuthDataNotExists(): HttpError {
    throw new HttpError(404, 'Auth data not exists', { error: 'auth data nto exists' });
  }
}

export default AuthError;
