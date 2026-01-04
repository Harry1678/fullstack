import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { startDb } from "../db/container";
import { createApp } from "../../src/app/app";

let db: any;
let container: any;
let app: any;

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

describe("GET /ping", () => {
  it("returns ok true", async () => {
    const res = await request(app).get("/ping");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
