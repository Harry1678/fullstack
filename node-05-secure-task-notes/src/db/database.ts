import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "app.db");

let SQL: any;
let db: any;

export async function getDb() {
  if (db) return db;

  SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
  }

  return db;
}

export function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}
export function closeDb() {
  if (!db) return;
  saveDb();
  db.close();
  db = null;
  console.log(" Database closed gracefully");
}