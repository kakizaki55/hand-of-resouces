const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Profile = require('../lib/models/Profile');

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
    const { body } = await request(app).post('/api/v1/profiles').send(expected);
    expect(body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get and array full  of all the profiles', async () => {
    const expected = await Profile.getAll();
    const { body } = await request(app).get('/api/v1/profiles');
    expect(body).toEqual(expected);
  });

  it('get a profile based on a id', async () => {
    const expected = await Profile.findById(1);
    const { body } = await request(app).get(`/api/v1/profiles/${expected.id}`);
    expect(expected).toEqual(body);
  });

  it('update the profile by the id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'emma',
      bio: 'huge nick cage fan, nemesis of michelle',
    };
    const { body } = await request(app).patch('/api/v1/profiles/1').send({
      name: 'emma',
      bio: 'huge nick cage fan, nemesis of michelle',
    });
    expect(body).toEqual(expected);
  });

  it('it deletes profile by id', async () => {
    const expected = await Profile.findById(1);
    const { body } = await request(app).delete(
      `/api/v1/profiles/${expected.id}`
    );
    expect(expected).toEqual(body);
  });
});
