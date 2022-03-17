const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Tea = require('../lib/models/Tea');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a tea object', async () => {
    const expected = {
      name: 'ban-cha',
      origin: 'japan',
    };
    const { body } = await request(app).post('/api/v1/teas').send(expected);
    expect(body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get and array full  of all the teas', async () => {
    const expected = await Tea.getAll();
    const { body } = await request(app).get('/api/v1/teas');
    expect(body).toEqual(expected);
  });

  it('get a tea based on a id', async () => {
    const expected = await Tea.findById(1);
    const { body } = await request(app).get(`/api/v1/teas/${expected.id}`);
    expect(expected).toEqual(body);
  });

  it('update the tea by the id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'mint-tea',
      origin: 'unknown',
    };
    const { body } = await request(app).patch('/api/v1/teas/1').send({
      name: 'mint-tea',
      origin: 'unknown',
    });
    expect(body).toEqual(expected);
  });

  it('it deletes tea by id', async () => {
    const expected = await Tea.findById(1);
    const { body } = await request(app).delete(`/api/v1/teas/${expected.id}`);
    expect(expected).toEqual(body);
  });
  it.only('return 404 for not found', async () => {
    const response = await request(app).get('/api/v1/teas/1234');

    expect(response.status).toEqual(404);
  });
});
