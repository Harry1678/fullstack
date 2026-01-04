import { getDb, saveDb } from "./database";

export type User = {
  id: number;
  email: string;
  password_hash: string;
  role: string;
};

export async function createUser(
  email: string,
  passwordHash: string,
  role: string
) {
  const db = await getDb();

  try {
    db.run(
      "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
      [email, passwordHash, role]
    );
    saveDb();
  } catch (err: any) {
    if (err.message.includes("UNIQUE")) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    throw err;
  }
}

export async function getUserByEmail(
  email: string
): Promise<User | undefined> {
  const db = await getDb();
  const result = db.exec(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (result.length === 0) return undefined;

  const row = result[0].values[0];
  const [id, emailVal, password_hash, role] = row;

  return { id, email: emailVal, password_hash, role };
}
