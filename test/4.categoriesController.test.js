const request = require('supertest');
const app = require('../app');

/*
----------------------------------------------------
  Categories Controller: GET /api/categories
----------------------------------------------------
*/
describe('GET /api/categories', () => {
  it('should fetch categories as json', (done) => {
    request(app)
    .get('/api/categories')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  });
});

/*
----------------------------------------------------
  Categories Controller: GET /api/categories/:id
----------------------------------------------------
*/
describe('GET /api/categories/:id', () => {
  it('should fetch category by id as json', (done) => {
    request(app)
    .get('/api/categories/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  });
});
