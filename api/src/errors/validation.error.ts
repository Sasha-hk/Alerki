import HttpError from './http.error';
import IError from '../interfaces/error.interface';

/**
 * Validation error
 */
class ValidationError extends HttpError {
  /**
   * Validation error constructor
   * @param {number=} status Error code
   * @param {string=} message Console message
   * @param {IError=} error Response error description
   */
  constructor(status: number = 400, message: string = 'Validation error', error?: IError) {
    super(status, message, error);
  }
}

export default ValidationError;
