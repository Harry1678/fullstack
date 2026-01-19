import { Pool, QueryResultRow } from 'pg';

export abstract class BaseRepository<T extends QueryResultRow> {
  protected constructor(
    protected readonly pool: Pool,
    protected readonly table: string
  ) {}

  async findById(id: number): Promise<T | null> {
    const result = await this.pool.query<T>(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id]
    );
    return result.rows[0] ?? null;
  }

  async findAll(): Promise<T[]> {
    const result = await this.pool.query<T>(
      `SELECT * FROM ${this.table}`
    );
    return result.rows;
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.pool.query(
      `DELETE FROM ${this.table} WHERE id = $1`,
      [id]
    );
    return result.rowCount === 1;
  }
}
