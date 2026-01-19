import { Pool, QueryResultRow } from 'pg';
import { BaseRepository } from './base.repository';

export interface User extends QueryResultRow {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export class UserRepository extends BaseRepository<User> {
  constructor(pool: Pool) {
    super(pool, 'users');
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0] ?? null;
  }

  async create(email: string, passwordHash: string): Promise<User> {
    const result = await this.pool.query<User>(
      `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING *
      `,
      [email, passwordHash]
    );

    return result.rows[0];
  }
}
