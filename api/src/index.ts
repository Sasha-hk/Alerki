import App from './app';
import AuthController from './controllers/auth.controller';
import Database from './db/connect';

const db = new Database();
const app = new App();

app.setControllers([
  new AuthController(),
]);

db.connect();
app.listen();
