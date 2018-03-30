const request = require('supertest');
const app = require('../app');
let cookies;

/* Constants */
const login = {
  email: 'akash@improwised.com',
  password: 'testpassword'
}

const newAdvertise = {
  title: "Lorem Ipsum",
  description: "description is this 1233",
  price: 12345.23,
  condition: "Good",
  categoryId: 1,
  lat: -2.451235,
  long: 6.234516,
  cityId: 1
}

const advertiseId = 1;
const anotherAdvertiseId = 3;
const categoryName = 'Fashion';
const keyword = 'lorem';
const exampleImagePath = 'test/test_images/google-plus.png';

/*
----------------------------------------------------
  Advertises Controller: GET /api/ads
----------------------------------------------------
*/
describe('GET /api/ads', () => {
  it('should fetch advertises as json', (done) => {
    request(app)
    .get('/api/ads')
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
  Advertises Controller: GET /api/ads/:id
----------------------------------------------------
*/
describe('GET /api/ads/:id', () => {
  it('should fetch single advertises as json', (done) => {
    request(app)
    .get('/api/ads/' + advertiseId)
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
  Advertises Controller: GET /api/ads/search/results/
  :keyword
----------------------------------------------------
*/
describe('GET /api/ads/search/results/:keyword', () => {
  it('should fetch advertises based upon search as json', (done) => {
    request(app)
    .get('/api/ads/search/results/' + keyword)
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
  Advertises Controller: GET /api/ads/categories/
  :categoryName/?term=keyword
----------------------------------------------------
*/
describe('GET /api/ads/categories/:categoryName/', () => {
  it('should fetch advertises based upon category id as json', (done) => {
    request(app)
    .get('/api/ads/categories/' + categoryName + '/?term=' + keyword)
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
  Advertises Controller: POST /api/ads,
   POST /api/ads/:id/upload, PUT /api/ads/:id/publish
----------------------------------------------------
*/
describe('login a user and create advertise with 3 stages', () => {

  it('should first login a user', (done) => {
    request(app)
    .post('/api/users/login')
    .send(login)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      cookies = res.headers['set-cookie'].pop().split(';')[0];
      expect(res.body.message).toBe('Success')
      done()
    })
  })

  it('should create a new advertise - stage1', (done) => {
    const req = request(app).post('/api/ads')
    req.cookies = cookies;
    req
    .send(newAdvertise)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })

  it('should upload a photos of advertise - stage2', (done) => {
    const req = request(app).post('/api/ads/' + advertiseId + '/upload')
    req.cookies = cookies;
    req
    .attach('images', exampleImagePath)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })

  it('should publish a advertise - published(stage3)', (done) => {
    const req = request(app).put('/api/ads/' + advertiseId + '/publish')
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
  Advertises Controller: PUT /api/ads/:id/sells
----------------------------------------------------
*/
describe('PUT /api/ads/:id/sell', () => {
  it('should modify a existing advertise status as false', (done) => {
    const req = request(app).put('/api/ads/' + advertiseId + '/sell')
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
  Advertises Controller: PUT /api/ads/:id/sells
----------------------------------------------------
*/
describe('PUT /api/ads/:id/sold', () => {
  it('should modify a existing advertise status as true', (done) => {
    const req = request(app).put('/api/ads/' + advertiseId + '/sold')
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
  Advertises Controller: DELETE /api/ads/:id
----------------------------------------------------
*/
describe('DELETE /api/ads/:id', () => {
  it('should delete a existing advertise', (done) => {
    const req = request(app).delete('/api/ads/' + anotherAdvertiseId)
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
