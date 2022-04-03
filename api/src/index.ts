import App from './app';
import Database from './db/connect';

async function start() {
  const db = new Database();
  const app = new App();

  await db.connect();
  app.listen();
}

start();
