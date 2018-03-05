const request = require('supertest');
const app = require('../app');

/*
----------------------------------------------------
  States Controller: GET /api/states
----------------------------------------------------
*/
describe('GET /api/states', () => {
  it('should fetch states as json', (done) => {
    request(app)
    .get('/api/states')
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
  States Controller: GET /api/states/:id/cities
----------------------------------------------------
*/
describe('GET /api/states/:id/cities', () => {
  it('should fetch cities of state by id as json', (done) => {
    request(app)
    .get('/api/states/1/cities')
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
  States Controller: GET /api/states/
  :stateId
----------------------------------------------------
*/
describe('GET /api/categories/:stateId', () => {
  it('should fetch state by id as json', (done) => {
    request(app)
    .get('/api/states/1')
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
  States Controller: POST /api/states
----------------------------------------------------
*/
describe('POST /api/states', () => {
  it('should create a new states', (done) => {
    request(app)
    .post('/api/states')
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
  States Controller: PUT /api/categories/
  :categoryId
----------------------------------------------------
*/
describe('PUT /api/states/:stateId', () => {
  it('should modify a states by id', (done) => {
    request(app)
    .put('/api/states/1')
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
  States Controller: DELETE /api/categories/
  :categoryId
----------------------------------------------------
*/
describe('DELETE /api/states/:stateId', () => {
  it('should delete a state by id', (done) => {
    request(app)
    .delete('/api/states/1')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})
