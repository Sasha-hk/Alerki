import Database from '../db/connect';

export default async function setup() {
  const db = new Database();

  await db.connect();
}
