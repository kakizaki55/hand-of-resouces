const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Color = require('../lib/models/Color');

describe('hand of resource routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it.only('creates a new color object ', async () => {
    const expected = {
      name: 'blue',
      vibe: 'cool',
    };
    const { body } = await request(app).post('/api/v1/colors').send(expected);
    expect(body).toEqual({ id: expect.any(String), ...expected });
  });
  it('gets an array full of all the colors in the table', async () => {
    const expected = await Color.getAll();
    const { body } = await request(app).get('/api/v1/colors');
    expect(body).toEqual(expected);
  });
  it('get a color based on a id', async () => {
    const expected = await Color.findById(1);
    const { body } = await request(app).get(`/api/v1/colors/${expected.id}`);
    expect(expected).toEqual(body);
  });

  it('update the color by the id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'pink',
      vibe: 'fun',
    };
    const { body } = await request(app).patch('/api/v1/colors/1').send({
      name: 'pink',
      vibe: 'fun',
    });
    expect(body).toEqual(expected);
  });

  it('it deletes color by id', async () => {
    const expected = await Color.findById(1);
    const { body } = await request(app).delete(`/api/v1/colors/${expected.id}`);
    expect(expected).toEqual(body);
  });
  it('return 404 for not found', async () => {
    const response = await request(app).get('/api/v1/colors/1234');

    expect(response.status).toEqual(404);
  });
});
