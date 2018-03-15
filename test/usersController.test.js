const request = require('supertest');
const app = require('../app');

let cookies;

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
      username: 'test',
      email: 'testxxxxxxx@test.com',
      password: '123456789',
      phone: '7897897890'
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
      email: '7777777@test.com',
      password: 'test@password',
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      cookies = res.headers['set-cookie'].pop().split(';')[0];
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})

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
  Users Controller: GET /api/users/profile
----------------------------------------------------
*/
describe('GET /api/users/profile', () => {
  it('should fetch profile of a logged in user', (done) => {
    const req = request(app).get('/api/users/profile')
    req.cookies = cookies;
    req
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
  it('should modify a user', (done) => {
    const req = request(app).put('/api/users/edit')
    req.cookies = cookies;
    req
    .send({
      username: 'rajan-bye',
      email: '7777777@test.com',
      phone: '9898012345'
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
  Users Controller: GET /api/users/ads
----------------------------------------------------
*/
describe('GET /api/users/ads', () => {
  it('should fetch advertises of a logged in user', (done) => {
    const req = request(app).get('/api/users/ads')
    req.cookies = cookies;
    req
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
  it('should modify a local user password', (done) => {
    const req = request(app).put('/api/users/password/update')
    req.cookies = cookies;
    req
    .send({
      password: 'test@password'
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

/*
----------------------------------------------------
  Users Controller: POST /api/users/status/email
----------------------------------------------------
*/
describe('POST /api/users/status/email', () => {
  it('should check if email is available for a new user', (done) => {
    request(app)
    .post('/api/users/status/email')
    .send({
      email: 'completlyNewEmail@test.com'
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.status).toBe('Available')
      done()
    })
  })

  it('should check if email is Not available for a new user', (done) => {
    request(app)
    .post('/api/users/status/email')
    .send({
      email: '7777777@test.com'
    })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.status).toBe('Not Available')
      done()
    })
  })

})

/*
----------------------------------------------------
  Users Controller: GET /api/users/auth/status
----------------------------------------------------
*/
describe('GET /api/users/auth/status', () => {
  it('should fetch details of a logged in user', (done) => {
    const req = request(app).get('/api/users/auth/status')
    req.cookies = cookies;
    req
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})
