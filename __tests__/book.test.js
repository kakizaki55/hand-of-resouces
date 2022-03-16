const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.only('creates a book object', async () => {
    const expected = {
      author: 'ian',
      title: 'movie monster origin stories',
    };
    const { body } = await request(app).post('/api/v1/books').send(expected);
    expect(body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get and array full  of all the books', async () => {
    const expected = await Book.getAll();
    const { body } = await request(app).get('/api/v1/books');
    expect(body).toEqual(expected);
  });

  it('get a book based on a id', async () => {
    const expected = await Book.findById(1);
    const { body } = await request(app).get(`/api/v1/books/${expected.id}`);
    expect(expected).toEqual(body);
  });

  it('update the book by the id', async () => {
    const expected = {
      id: expect.any(String),
      author: 'michelle',
      title: 'how to bug emma, a field guid',
    };
    const { body } = await request(app).patch('/api/v1/books/1').send({
      author: 'michelle',
      title: 'how to bug emma, a field guid',
    });
    expect(body).toEqual(expected);
  });

  it('it deletes book by id', async () => {
    const expected = await Book.findById(1);
    const { body } = await request(app).delete(`/api/v1/books/${expected.id}`);
    expect(expected).toEqual(body);
  });
});
