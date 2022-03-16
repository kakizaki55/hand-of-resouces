const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('creates a profile object', async () => {
    const expected = {
      name: 'forest',
      bio: 'lots of trees, color enthusiast',
    };
    const response = await request(app).post('/api/v1/profiles').send(expected);
    expect(response.body).toEqual({ id: expect.any(String), ...expected });
  });
});
