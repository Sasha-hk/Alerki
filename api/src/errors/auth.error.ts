import HttpError from './http.error';

/**
 * Authentication / Authorization error
 */
class AuthError extends HttpError {
  /**
   * Invalid access token error
   * @returns {HttpError} Error
   */
  static BadAccessToken(): HttpError {
    return new HttpError(400, 'Invalid access token', { error: 'invalid access token' });
  }

  /**
   * Invalid refresh token error
   * @returns {HttpError} Error
   */
  static BadRefreshToken(): HttpError {
    return new HttpError(400, 'Invalid refresh token', { error: 'invalid refresh token' });
  }

  /**
   * User not authenticated error
   * @returns {HttpError} Error
   */
  static Unauthorized(): HttpError {
    return new HttpError(401, 'User not authorized', { error: 'not authorized' });
  }

  /**
   * Bad password error
   * @returns {HttpError} Error
   */
  static BadPassword(): HttpError {
    return new HttpError(400, 'Bad password', { error: 'bad password' });
  }

  /**
   * Username not exists error
   * @returns {HttpError} Error
   */
  static UsernameNotExists(): HttpError {
    return new HttpError(
      400,
      'Username not exists',
      { error: { username: 'username not exists' } },
    );
  }

  /**
   * Username exists error
   * @returns {HttpError} Error
   */
  static UsernameExists(): HttpError {
    return new HttpError(
      400,
      'Username already exists',
      { error: { username: 'username already exists' } },
    );
  }

  /**
   * Email exists error
   * @returns {HttpError} Error
   */
  static EmailExists(): HttpError {
    return new HttpError(400, 'Email already exists', { error: { email: 'email already exists' } });
  }

  /**
   * Email not exists error
   * @returns {HttpError} Error
   */
  static EmailNotExists(): HttpError {
    return new HttpError(400, 'Email not exists', { error: { email: 'email not exists' } });
  }

  /**
   * User is not a master
   * @returns {HttpError} Error
   */
  static NotMaster(): HttpError {
    return new HttpError(400, 'User is not master', { error: 'user is not a master' });
  }
}

export default AuthError;
