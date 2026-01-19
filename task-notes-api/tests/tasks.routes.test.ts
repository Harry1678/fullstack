import request from 'supertest';
import express from 'express';
import { describe, it, expect, vi } from 'vitest';
import { createTaskRouter } from '../src/routes/tasks';
import { TaskService } from '../src/services/task.service';

vi.mock('../src/auth/middleware', () => ({
  authenticate: (_req: any, _res: any, next: any) => next(),
}));

const mockTaskService: TaskService = {
  list: async () => [
    { id: 1, title: 'Mock Task', completed: false, priority: 'low' },
  ],

  getById: async (id: number) =>
    id === 1
      ? { id: 1, title: 'Mock Task', completed: false, priority: 'low' }
      : null,

  create: async (data: any) => ({
    id: 2,
    completed: false,
    ...data,
  }),

  update: async () => null,
  delete: async () => true,
} as any;

function setupTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/tasks', createTaskRouter(mockTaskService));
  return app;
}

describe('Tasks API (Route Unit Test)', () => {
  it('creates a task', async () => {
    const app = setupTestApp();

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task', priority: 'low' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test task');
  });

  it('lists tasks', async () => {
    const app = setupTestApp();

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
