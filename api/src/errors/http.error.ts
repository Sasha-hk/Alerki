import IError from '../interfaces/error.interface';

class HttpError extends Error {
  public status: number;
  public message: string;
  public error?: IError;

  /**
   * Error constructor
   * @param {number} status Error status
   * @param {string} message Console message
   * @param {IError} error Response error description
   */
  constructor(status: number, message: string, error?: IError) {
    super(message);

    this.status = status;
    this.message = message;

    if (error) {
      this.error = error;
    }
  }

  /**
   * Bad request error
   * @param {error} error error description
   */
  static BarRequest(error?: IError) {
    return new HttpError(400, 'bad request', error);
  }
}

export default HttpError;
