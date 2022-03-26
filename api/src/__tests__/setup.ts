import Database from '../db/connect';

export default function setup() {
  const db = new Database();

  db.connect();
}
