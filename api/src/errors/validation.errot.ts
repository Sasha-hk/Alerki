import HttpError from './http.error';
import IError from './error.interface';

/**
 * Validation error
 */
class ValidationError extends HttpError {
  /**
   * All parameters required
   * @param {string} message Error message to console
   * @param {IError} error Error response to client
   * @returns {Error} Error
   */
  static AllRequired(message: string, error: IError): HttpError {
    return new HttpError(400, message, error);
  }

  /**
   * At least one parameter is required
   * @param {string} message Error message to console
   * @param {IError} error Error response to client
   * @returns {Error} Error
   */
  static AtLeastOne(message: string, error: IError): HttpError {
    return new HttpError(400, message, error);
  }
}

export default ValidationError;
