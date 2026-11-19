import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

const app = createApp();

describe('API basics', () => {
  it('GET /api/v1/health returns ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('unknown routes return a 404 error body', async () => {
    const res = await request(app).get('/api/v1/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('not_found');
  });

  it('register rejects invalid input with field errors', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'bad', password: '1' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('validation_error');
    expect(res.body.error.details).toHaveProperty('email');
    expect(res.body.error.details).toHaveProperty('password');
  });

  it('/auth/me without a cookie is 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });
});
