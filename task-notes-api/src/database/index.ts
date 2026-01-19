import { Pool, QueryResultRow } from "pg";
import { getDatabaseUrl } from "./config";
import { metrics } from "./metrics";

export const pool = new Pool({
  connectionString: getDatabaseUrl(),
  max: Number(process.env.DB_POOL_SIZE ?? 10),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT ?? 30000),
  connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT ?? 2000),
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function queryWithTiming<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
) {
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  const duration = Date.now() - start;

  if (duration > 100) {
    console.warn("Slow query detected", {
      text,
      params,
      duration,
    });
    metrics.slowQueries++;
  }
  metrics.queries++;
  return result;
}
