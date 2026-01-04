import { Client } from "pg";

export async function createUser(db: Client, email: string) {
  const res = await db.query(
    "INSERT INTO users(email) VALUES($1) RETURNING *",
    [email]
  );
  return res.rows[0];
}

export async function getUserById(db: Client, id: number) {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0] ?? null;
}

export async function listUsers(db: Client, limit = 50, offset = 0) {
  const res = await db.query(
    "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return res.rows;
}

export async function truncateUsers(db: Client) {
  await db.query("TRUNCATE TABLE users RESTART IDENTITY");
}

export async function getUserByEmail(db: Client, email: string) {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0] ?? null;
}

export async function createUserWithTx(
  db: Client,
  email: string,
  fail = false
) {
  try {
    await db.query("BEGIN");

    await db.query("INSERT INTO users(email) VALUES($1)", [email]);

    if (fail) throw new Error("boom");

    await db.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
}
import { describe, it, expect } from "vitest";

describe("userRepo placeholder", () => {
  it("loads test suite", () => {
    expect(true).toBe(true);
  });
});
