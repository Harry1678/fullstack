import { connection } from "./redis.js";

const PREFIX = "idem:";

export async function isProcessed(key: string) {
  return (await connection.get(PREFIX + key)) === "1";
}

export async function markProcessed(key: string) {
  await connection.set(PREFIX + key, "1");
}
