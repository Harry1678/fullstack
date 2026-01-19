// import request from 'supertest';
// import { describe, it, expect, beforeAll, afterAll } from 'vitest';
// // import { setupTestServer, cleanup } from './helpers';

// let server: any;
// let base = 'http://localhost:3000';
// let dataDir = '';

// beforeAll(async () => {
//   const setup = setupTestServer();
//   server = setup.server;
//   dataDir = setup.dataDir;
//   await server.start();
// });

// afterAll(async () => {
//   await server.stop();
//   cleanup(dataDir);
// });

// describe('Auth', () => {
//   it('registers a user', async () => {
//     const res = await request(base)
//       .post('/api/auth/register')
//       .send({ email: 'test@a.com', password: 'secret' });

//     expect(res.status).toBe(201);
//     expect(res.body.email).toBe('test@a.com');
//   });

//   it('logs in and returns JWT', async () => {
//     const res = await request(base)
//       .post('/api/auth/login')
//       .send({ email: 'test@a.com', password: 'secret' });

//     expect(res.status).toBe(200);
//     expect(res.body.token).toBeDefined();
//   });
// });
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupTestServer, cleanup } from './helpers.js';

let server: any;
let base = 'http://localhost:3000';
let dataDir = '';

describe('Auth API', () => {
  beforeAll(async () => {
    const setup = setupTestServer();
    server = setup.server;
    dataDir = setup.dataDir;
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
    cleanup(dataDir);
  });

  it('registers a user', async () => {
    const res = await request(base)
      .post('/api/auth/register')
      .send({ email: 'test@a.com', password: 'secret' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('test@a.com');
  });

  it('logs in and returns JWT', async () => {
    const res = await request(base)
      .post('/api/auth/login')
      .send({ email: 'test@a.com', password: 'secret' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
