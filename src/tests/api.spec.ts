import request from 'supertest';
import { app } from '../../src/app';

describe('API Health & Basic Endpoints', () => {
  it('GET /health deve responder com 200 e status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('uptime');
  });

  it('GET / deve responder com 200 (compatibilidade)', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('GET /api-docs deve servir a página do Swagger UI', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
