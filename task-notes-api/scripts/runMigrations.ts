import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  
  const migrationsDir = path.join(process.cwd(), 'migrations');
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  
  const result = await pool.query<{ name: string }>(
    'SELECT name FROM migrations'
  );
  const applied = new Set(result.rows.map((r) => r.name));

  
  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = fs.readFileSync(
      path.join(migrationsDir, file),
      'utf-8'
    );

    console.log(`Running migration: ${file}`);
    await pool.query(sql);
    await pool.query(
      'INSERT INTO migrations (name) VALUES ($1)',
      [file]
    );
  }

  await pool.end();
}

runMigrations().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
