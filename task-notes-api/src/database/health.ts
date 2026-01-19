import { pool } from './index';
import { markDbDown } from './healthState';

export async function checkDbHealth(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (err) {
    markDbDown();
    return false;
  }
}
