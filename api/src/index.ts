import App from './app';
import AuthController from './controllers/auth.controller';

const app = new App();

app.setControllers([
  new AuthController(),
]);

app.listen();
