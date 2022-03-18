const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Tree = require('../lib/models/Tree');

describe('hand of resource routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('creates a new tree object ', async () => {
    const expected = {
      name: 'pear tree',
      region: 'portland',
    };
    const { body } = await request(app).post('/api/v1/trees').send(expected);
    expect(body).toEqual({ id: expect.any(String), ...expected });
  });
  it('gets an array full of all the trees in the table', async () => {
    const expected = await Tree.getAll();
    const { body } = await request(app).get('/api/v1/trees');
    expect(body).toEqual(expected);
  });
  it('get a tree based on a id', async () => {
    const expected = await Tree.findById(1);
    const { body } = await request(app).get(`/api/v1/trees/${expected.id}`);
    expect(expected).toEqual(body);
  });

  it('update the tree by the id', async () => {
    const expected = {
      name: 'burch',
      region: 'alaska',
    };
    const { body } = await request(app).patch('/api/v1/trees/1').send({
      name: 'burch',
      region: 'alaska',
    });
    expect(body).toEqual({ ...expected, id: expect.any(String) });
  });

  it('it deletes tree by id', async () => {
    const expected = await Tree.findById(1);
    const { body } = await request(app).delete(`/api/v1/trees/${expected.id}`);
    expect(expected).toEqual(body);
  });
  it('return 404 for not found', async () => {
    const response = await request(app).get('/api/v1/trees/1234');

    expect(response.status).toEqual(404);
  });
});
