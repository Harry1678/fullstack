import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const test = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows[0]);
  await pool.end();
};

test();
