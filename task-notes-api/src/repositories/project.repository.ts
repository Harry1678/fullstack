import { pool } from '../database/index';

export class ProjectRepository {
  async create(client: any, name: string) {
    const result = await client.query(
      'INSERT INTO projects (name) VALUES ($1) RETURNING id',
      [name]
    );

    return result.rows[0];
  }
}
