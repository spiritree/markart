import server from '../../app';
import * as request from 'supertest';

afterEach(() => {
  server.close();
});

test('get Auth', async () => {
  const response = await request(server).get('/api/auth');
  expect(response.body.code).toBe(1);
});

afterAll(() => {
  server.close();
});