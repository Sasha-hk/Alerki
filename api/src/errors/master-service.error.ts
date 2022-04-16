import HttpError from './http.error';
import IError from '../interfaces/error.interface';

/**
 * Services error
 */
class MasterServiceError extends HttpError {
  /**
   * Services error constructor
   * @param status Error code
   * @param message Console message
   * @param error Response error description
   */
  constructor(status: number = 400, message: string = 'Validation error', error?: IError) {
    super(status, message, error);
  }

  /**
   * Services not found
   * @returns {HttpError} Error
   */
  static ServiceNotBelongsToUser(): HttpError {
    throw new HttpError(400, 'The service not belongs to user', { error: 'the service not belong to you' });
  }

  /**
   * Services not found
   * @returns {HttpError} Error
   */
  static NotFound(): HttpError {
    throw new HttpError(404, 'The service not found', { error: 'the service not found' });
  }
}

export default MasterServiceError;
