const request = require('supertest');
const app = require('../app');

const user = {
  username: 'test',
  email: 'AlphaTest2@test.com',
  password: '123456789',
  phone: '7897897890'
}

/*
----------------------------------------------------
  Users Controller: POST /api/users/register
----------------------------------------------------
*/
describe('POST /api/users/register', () => {
  it('should create a new user', (done) => {
    request(app)
    .post('/api/users/register')
    .send({
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone
    })
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
  Users Controller: POST /api/users/login
----------------------------------------------------
*/
describe('POST /api/users/login', () => {
  it('should login a user', (done) => {
    request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: user.password
    })
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
  Users Controller: GET /api/users/profile
----------------------------------------------------
*/
describe('GET /api/users/profile', () => {

  it('send profile data of logged in user', (done) => {
    request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: user.password
    })
    .expect(200)
    .end((err) => {
      if (err) return done(err)
      request(app)
      .get('/api/users/profile')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('Success')
        done()
      })
      done()
    })
  })

});

/*
----------------------------------------------------
  Users Controller: GET /api/users/profile/:id
----------------------------------------------------
*/
describe('GET /api/users/profile/:id', () => {
  it('should fetch profile of a particular user', (done) => {
    request(app)
    .get('/api/users/profile/2')
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
  Users Controller: PUT /api/users/edit
----------------------------------------------------
*/
describe('PUT /api/users/edit', () => {

  it('edit profile data of logged in user', (done) => {
    request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: user.password
    })
    .expect(200)
    .end((err) => {
      if (err) return done(err)
      request(app)
      .put('/api/users/edit')
      .send({
        email: user.email,
        phone: user.phone,
        username: user.username
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('Success')
        done()
      })
      done()
    })
  })

});

/*
----------------------------------------------------
  Users Controller: GET /api/users/ads/:id
----------------------------------------------------
*/
describe('GET /api/users/ads/:id', () => {
  it('should fetch advertises of a particular user', (done) => {
    request(app)
    .get('/api/users/ads/1')
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
  Users Controller: PUT /api/users/password/update
----------------------------------------------------
*/
describe('PUT /api/users/password/update', () => {

  it('edit password of logged in user', (done) => {
    request(app)
    .post('/api/users/login')
    .send({
      email: user.email,
      password: user.password
    })
    .expect(200)
    .end((err) => {
      if (err) return done(err)
      request(app)
      .put('/api/users/password/update')
      .send({
        password: user.password
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).toBe('Success')
        done()
      })
      done()
    })
  })

});

/*
----------------------------------------------------
  Users Controller: GET /api/users/logout
----------------------------------------------------
*/
describe('GET /api/users/logout', () => {
  it('should logout a user', (done) => {
    request(app)
    .get('/api/users/logout')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})
