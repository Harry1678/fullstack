import 'dotenv/config';
import fs from 'node:fs';
import { pool } from '../src/database/index';
import path from 'node:path';

export async function seed() {
  console.log('DB URL:', process.env.DATABASE_URL_DEV);

  const sqlFile = process.argv[2];
  if (!sqlFile) {
    throw new Error('Seed file not provided');
  }

  const sql = fs.readFileSync(
    path.resolve(sqlFile),
    'utf-8'
  );

  await pool.query(sql);
  console.log('Seed completed');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
