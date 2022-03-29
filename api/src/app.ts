import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Controller from './interfaces/controller.interface';
import AuthController from './controllers/auth.controller';

interface IApp {
  readonly app: express.Application;
  readonly env: string;
  readonly port: string | number;
}

/**
 * Server object
 */
class App implements IApp {
  readonly app = express();
  readonly env = process.env.NODE_ENV || 'dev';
  readonly port = process.env.API_PORT || 3000;

  /**
   * App constructor
   */
  constructor() {
    this.setMiddlewares();
    this.setControllers([
      new AuthController(),
    ]);
  }

  /**
   * Set middlewares
   */
  private setMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  /**
   * Set controllers
   * @param {Controller[]} controllers array of controllers
   */
  public setControllers(controllers: Controller[]): void {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  /**
   * Start listening the server
   */
  public listen() {
    if (this.env === 'dev') {
      this.app.listen(this.port, () => {
        console.log(`Development server started on http://localhost:${this.port}`);
      });
    } else if (this.env === 'test') {
      this.app.listen(this.port, () => {
        console.log('Test server started');
      });
    } else if (this.env === 'prod') {
      this.app.listen(this.port, () => {
        console.log(`Production server started on port ${this.port}`);
      });
    }
  }

  getApp() {
    return this.app;
  }
}

export default App;
