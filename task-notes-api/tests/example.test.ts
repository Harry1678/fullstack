import { describe, it, expect } from 'vitest';
import { createTestDb } from './db';

type User = {
  id: number;
  email: string;
  password: string;
};

describe('SQLite test DB', () => {
  it('creates and queries data', () => {
    const db = createTestDb();

    db.prepare(
      'INSERT INTO users (email, password) VALUES (?, ?)'
    ).run('a@test.com', 'secret');

    const user = db
      .prepare('SELECT * FROM users')
      .get() as User;

    expect(user.email).toBe('a@test.com');
  });
});
