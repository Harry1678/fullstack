import { pool } from '../src/database/index';

async function reset() {
  await pool.query('DROP SCHEMA public CASCADE');
  await pool.query('CREATE SCHEMA public');

  console.log('Database reset');
  process.exit(0);
}

reset();
