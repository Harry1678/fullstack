import { pool } from "./database";
import { Task, User } from "./types";

export async function getUser(id: number): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0] ?? null;
}


export async function createTask(
  userId: number,
  title: string
): Promise<Task> {
  const result = await pool.query<Task>(
    `INSERT INTO tasks (title, user_id)
     VALUES ($1, $2)
     RETURNING *`,
    [title, userId]
  );

  return result.rows[0];
}


export async function getUserTasks(userId: number): Promise<Task[]> {
  const result = await pool.query<Task>(
    "SELECT * FROM tasks WHERE user_id = $1",
    [userId]
  );

  return result.rows;
}
