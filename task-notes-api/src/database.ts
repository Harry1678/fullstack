import Database from 'better-sqlite3';
import { User } from './models/user';

export class UserDatabase {
  constructor(private db: Database.Database) {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `);
  }

  createUser(email: string, password_hash: string, role: 'user' | 'admin'): User {
    const created_at = new Date().toISOString();
    const stmt = this.db.prepare(
      `INSERT INTO users (email, password_hash, role, created_at)
       VALUES (?, ?, ?, ?)`
    );
    const info = stmt.run(email, password_hash, role, created_at);
    return { id: Number(info.lastInsertRowid), email, password_hash, role, created_at };
  }

 getUserByEmail(email: string): User | null {
  const row = this.db
    .prepare(`SELECT * FROM users WHERE email = ?`)
    .get(email) as User | undefined;

  return row ?? null;
}

getUserById(id: number): User | null {
  const row = this.db
    .prepare(`SELECT * FROM users WHERE id = ?`)
    .get(id) as User | undefined;

  return row ?? null;
}

}
