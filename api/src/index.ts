import App from './app';
import Database from './db/connect';

const db = new Database();
const app = new App();

db.connect();
app.listen();
