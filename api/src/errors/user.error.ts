import HttpError from './http.error';
import IError from '../interfaces/error.interface';

/**
 * User error
 */
class UserError extends HttpError {
  /**
   * Services error constructor
   * @param {number=} status Error code
   * @param {string=} message Console message
   * @param {IError=} error Response error description
   */
  constructor(status: number = 400, message: string = 'Validation error', error?: IError) {
    super(status, message, error);
  }

  /**
   * User not exists
   * @returns {HttpError} Error
   */
  static UserNotExists(): HttpError {
    throw new HttpError(404, 'User not exists', { error: 'user not exists' });
  }
}

export default UserError;
