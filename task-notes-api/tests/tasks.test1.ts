import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { TaskServer } from '../src/server';
import { loadConfig } from '../src/config';
import { FileStorage } from '../src/storage';
import path from 'node:path';

let server: TaskServer;

beforeAll(async () => {
  const config = loadConfig();
  const storage = new FileStorage(path.join(process.cwd(), 'data', 'test-tasks.json'));
  server = new TaskServer(config, storage);
  await server.start();
});

describe('Tasks API', () => {
  it('creates a task', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/tasks')
      .send({ title: 'Test', priority: 'low' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test');
  });

  it('lists tasks', async () => {
    const res = await request('http://localhost:3000').get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
