class HttpError extends Error {
  public status: number;
  public message: string;
  public error?: object;

  /**
   * Error constructor
   * @param {number} status Error status
   * @param {string} message Console message
   * @param {object} error Response error description
   */
  constructor(status: number, message: string, error?: object) {
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
   * @returns {HttpError} Error
   */
  static BarRequest(error?: object): HttpError {
    return new HttpError(400, 'bad request', error ? error : undefined);
  }
}

export default HttpError;
