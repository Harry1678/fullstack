import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupTestServer, cleanup } from './helpers';

let server: any;
let base = 'http://localhost:3000';
let token = '';
let dataDir = '';

beforeAll(async () => {
  const setup = setupTestServer();
  server = setup.server;
  dataDir = setup.dataDir;
  await server.start();

  await request(base)
    .post('/api/auth/register')
    .send({ email: 'u@u.com', password: 'secret' });

  const login = await request(base)
    .post('/api/auth/login')
    .send({ email: 'u@u.com', password: 'secret' });

  token = login.body.token;
});

afterAll(async () => {
  await server.stop();
  cleanup(dataDir);
});

describe('Tasks (auth required)', () => {
  it('rejects without token', async () => {
    const res = await request(base).get('/api/tasks');
    expect(res.status).toBe(401);
  });

  it('creates a task with token', async () => {
    const res = await request(base)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test task', priority: 'low' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test task');
  });

  it('lists tasks with token', async () => {
    const res = await request(base)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
