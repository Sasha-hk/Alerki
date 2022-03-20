import App from './app';
import AuthController from './controllers/auth.controller';
import connect from './db/connect';

const app = new App();

app.setControllers([
  new AuthController(),
]);

connect();

app.listen();
