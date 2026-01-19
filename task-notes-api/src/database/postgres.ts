import 'dotenv/config';
import { Pool } from 'pg';

export const postgresPool = new Pool({
  connectionString: process.env.DATABASE_URL,

  
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 2_000,
});


postgresPool.on('error', (err) => {
  console.error('Unexpected Postgres pool error', err);
});
