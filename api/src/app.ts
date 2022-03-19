import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Controller from './interfaces/controller.interface';


/**
 * Server object
 */
class App {
  private app: express.Application = express();
  private env: string = process.env.NODE_ENV || 'dev';
  private port: string | number = process.env.API_PORT || 3000

  /**
   * App constructor
   */
  constructor() {
    this.setMiddlewares();
  }

  /**
   * Set middlewares
   */
  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  /**
   * Set controllers
   * @param {Controller[]} controllers
   */
  public setControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  /**
   * Start listening the server
   */
  public listen() {
    if (this.env == 'dev') {
      this.app.listen(this.port, () => {
        console.log(`Development server started on http://localhost:${this.port}`);
      });
    } else if (this.env == 'test') {
      this.app.listen(this.port, () => {
        console.log(`Test server started`);
      });
    } else if (this.env == 'prod') {
      this.app.listen(this.port, () => {
        console.log(`Production server started on port ${this.port}`);
      });
    }
  }
}


export default App;
