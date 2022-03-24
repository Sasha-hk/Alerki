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

  /**
   * All parameters required
   * @param {string} message Error message to console
   * @param {IError} error Error response to client
   */
  static AllRequired(message: string, error: IError): HttpError {
    return new HttpError(400, message, error);
  }

  /**
   * At least one parameter is required
   * @param {string} message Error message to console
   * @param {IError} error Error response to client
   */
  static AtLeastOne(message: string, error: IError): HttpError {
    return new HttpError(400, message, error);
  }
}

export default ValidationError;
