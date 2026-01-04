import express from "express";
import { Client } from "pg";
import { createRoutes } from "./routes";

export function createApp(db: Client) {
  const app = express();

  app.use(express.json());

  app.get("/ping", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use(createRoutes(db));

  return app;
}
