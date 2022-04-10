import HttpError from './http.error';
import IError from '../interfaces/error.interface';

/**
 * Services error
 */
class UserPictureError extends HttpError {
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
   * Services not found
   * @returns {HttpError} Error
   */
  static NotFound(): HttpError {
    throw new HttpError(404, 'User picture not found', { error: 'picture not found' });
  }
}

export default UserPictureError;
