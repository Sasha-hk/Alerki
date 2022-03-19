import { Router } from 'express';
import Controller from '../interfaces/controller.interface';

/**
 * Implements authentication logic
 */
class AuthController implements Controller {
  public path = '/auth/';
  public router = Router();
}

export default AuthController;
