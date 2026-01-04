import { getDb, saveDb } from "./database";

async function init() {
  const db = await getDb();

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL
    );
  `);

  saveDb();
  console.log(" Database initialized");
}

init();
