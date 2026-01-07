import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import type { Client } from "pg";
import type { Express } from "express";

import { startDb } from "../db/container";
import { createApp } from "../../src/app/app";

let db: Client;
let container: StartedPostgreSqlContainer;
let app: Express;

beforeAll(async () => {
  const res = await startDb();
  db = res.client;
  container = res.container;
  app = createApp(db);
});

afterAll(async () => {
  if (db) await db.end();
  if (container) await container.stop();
});

describe("Drill 5 – DB failure", () => {
  it("returns 503 when DB is down", async () => {
    await db.end(); 

    const res = await request(app).get("/users");

    expect(res.status).toBe(503);
    expect(res.body.title).toBe("Service Unavailable");
    expect(res.body.status).toBe(503);
  });
});
