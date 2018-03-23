const request = require('supertest');
const app = require('../app');

let cookies;

/*
Constant Variables for Testcases
*/
const registerNewUser = {
  username: 'test',
  email: 'uniqueEmailEveryTime@improwised.com',
  password: '123456789',
  phone: '7897897890'
}

const loginExistingUser = {
  email: 'akash@improwised.com',
  password: 'testpassword'
}

const profileId = 1;

const advertiseId = 1;

const modifyUserDetails = {
  username: 'akash updated',
  email: 'akash@improwised.com',
  phone: '1234567890'
}

const newPassword = {
  password: 'testpassword'
}

const newEmail = {
  email: 'differentNewEmail@gmail.com'
}

const existingEmail = {
  email: 'akash@improwised.com'
}

const passwordResetToken = 'e5984a7d-b305-418c-a14b-d8466cbf1290';

/*
----------------------------------------------------
  Users Controller: POST /users/password/forget
----------------------------------------------------
*/
// describe('POST /api/users/password/forget', () => {
//   it('should insert data in reset-password and send reset link', (done) => {
//     request(app)
//     .post('/api/users/password/forget')
//     .send({
//       email: 'akash@improwised.com'
//     })
//     .expect(200)
//     .end((err, res) => {
//       return (err ? done.fail(err) : done());
//       console.log(res.body)
//       //expect(res.body.message).toBe('Success')
//     })
//   })
// })

/*
----------------------------------------------------
  Users Controller: POST /api/users/register
----------------------------------------------------
*/
describe('POST /api/users/register', () => {
  it('should create a new user', (done) => {
    request(app)
    .post('/api/users/register')
    .send(registerNewUser)
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
    .send(loginExistingUser)
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
    .get('/api/users/profile/' + profileId)
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
    .send(modifyUserDetails)
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
    .get('/api/users/ads/' + advertiseId)
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
    .send(newPassword)
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
    .send(newEmail)
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
    .send(existingEmail)
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

/*
----------------------------------------------------
  Users Controller: GET /users/password/reset/:token
----------------------------------------------------
*/
describe('GET /users/password/reset/:token', () => {
  it('should check if given link or token is valid or not', (done) => {
    const req = request(app).get('/api/users/password/reset/' + passwordResetToken)
    req
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      expect(res.body.validToken).toBe(true)
      done()
    })
  })
})

/*
----------------------------------------------------
  Users Controller: POST /users/password/reset/:token
----------------------------------------------------
*/
describe('POST /users/password/reset/:token', () => {
  it('should allow to set new password if given link or token is valid', (done) => {
    const req = request(app).post('/api/users/password/reset/' + passwordResetToken)
    req
    .send(newPassword)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})
