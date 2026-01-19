import { Pool, QueryResultRow } from 'pg';
import { BaseRepository } from './base.repository';

export interface Task extends QueryResultRow {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  user_id: number | null;
  created_at: Date;
  updated_at: Date;
}

export class TaskRepository extends BaseRepository<Task> {
  constructor(pool: Pool) {
    super(pool, 'tasks');
  }

  async findByUser(userId: number): Promise<Task[]> {
    const result = await this.pool.query<Task>(
      `
      SELECT *
      FROM tasks
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return result.rows;
  }

  async create(
    title: string,
    priority: Task['priority'],
    userId: number | null
  ): Promise<Task> {
    const result = await this.pool.query<Task>(
      `
      INSERT INTO tasks (title, priority, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [title, priority, userId]
    );

    return result.rows[0];
  }

  async markComplete(taskId: number): Promise<Task | null> {
    const result = await this.pool.query<Task>(
      `
      UPDATE tasks
      SET completed = true,
          updated_at = NOW()
      WHERE id = $1
      RETURNING *
      `,
      [taskId]
    );

    return result.rows[0] ?? null;
  }
  async update(
  id: number,
  data: {
    title?: string;
    priority?: Task['priority'];
    completed?: boolean;
  }
): Promise<Task | null> {
  const fields = [];
  const values: any[] = [];
  let idx = 1;

  if (data.title !== undefined) {
    fields.push(`title = $${idx++}`);
    values.push(data.title);
  }

  if (data.priority !== undefined) {
    fields.push(`priority = $${idx++}`);
    values.push(data.priority);
  }

  if (data.completed !== undefined) {
    fields.push(`completed = $${idx++}`);
    values.push(data.completed);
  }

  if (fields.length === 0) {
    return this.findById(id);
  }

  const result = await this.pool.query<Task>(
    `
    UPDATE tasks
    SET ${fields.join(', ')},
        updated_at = NOW()
    WHERE id = $${idx}
    RETURNING *
    `,
    [...values, id]
  );

  return result.rows[0] ?? null;
}
async createForProject(
  client: any,
  title: string,
  projectId: number
) {
  await client.query(
    'INSERT INTO tasks (title, project_id) VALUES ($1, $2)',
    [title, projectId]
  );
}


}
