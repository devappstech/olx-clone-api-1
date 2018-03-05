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
  Categories Controller: GET /api/categories/
  :categoryId
----------------------------------------------------
*/
describe('GET /api/categories/:categoryId', () => {
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

/*
----------------------------------------------------
  Categories Controller: POST /api/categories
----------------------------------------------------
*/
describe('POST /api/categories', () => {
  it('should create a new category', (done) => {
    request(app)
    .post('/api/categories')
    .expect(201)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})

/*
----------------------------------------------------
  Categories Controller: PUT /api/categories/
  :categoryId
----------------------------------------------------
*/
describe('PUT /api/categories/:categoryId', () => {
  it('should modify a category by id', (done) => {
    request(app)
    .put('/api/categories/1')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})

/*
----------------------------------------------------
  Categories Controller: DELETE /api/categories/
  :categoryId
----------------------------------------------------
*/
describe('DELETE /api/categories/:categoryId', () => {
  it('should delete a category by id', (done) => {
    request(app)
    .delete('/api/categories/1')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})
