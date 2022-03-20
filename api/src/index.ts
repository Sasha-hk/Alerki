import App from './app';
import AuthController from './controllers/auth.controller';
import Database from './db/connect';

const app = new App();

app.setControllers([
  new AuthController(),
]);

console.log(Database);

app.listen();
