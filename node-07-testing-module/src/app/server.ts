import { Client } from "pg";
import { createApp } from "./app";

const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

const app = createApp(db);
app.listen(3000, () => console.log("Server on 3000"));
