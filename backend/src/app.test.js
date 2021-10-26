/* eslint-disable no-undef */

const app = require('./app');
const supertest = require('supertest');

const request = supertest(app);

describe('App', () => {
  test('Backend api shuld be alive', async () => {
    const res = await request.get('/alive');
    expect(res.status).toBe(200);
  });
});