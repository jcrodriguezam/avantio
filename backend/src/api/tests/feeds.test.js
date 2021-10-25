/* eslint-disable no-undef */

const app = require('../../app');
const supertest = require('supertest');
const { close, connect } = require('../../config/database');

const request = supertest(app);

describe('App', () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await close();
  });

  test('Backend api shuld be alive', async () => {
    const res = await request.get('/alive');
    expect(res.status).toBe(200);
  });
});