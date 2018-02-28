const request = require('supertest');
const app = require('../app');

/*
----------------------------------------------------
  Users Controller: GET /api/users/profile/:id
----------------------------------------------------
*/
describe('GET /api/users/profile/:id', () => {
  it('should fetch user details by id as json', (done) => {
    request(app)
    .get('/api/users/profile/1')
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
  Users Controller: POST /api/users/register
----------------------------------------------------
*/
describe('POST /api/users/register', () => {
  it('should create a new user', (done) => {
    request(app)
    .post('/api/users/register')
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
  Users Controller: PUT /api/users/edit/:id
----------------------------------------------------
*/
describe('PUT /api/users/edit/:id', () => {
  it('should modify a user by id', (done) => {
    request(app)
    .put('/api/users/edit/1')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})
