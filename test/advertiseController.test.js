const request = require('supertest');
const app = require('../app');

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
    .get('/api/ads/:id')
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
  Advertises Controller: GET /api/ads/search
----------------------------------------------------
*/
describe('GET /api/ads/search', () => {
  it('should fetch advertises based upon search as json', (done) => {
    request(app)
    .get('/api/ads/search')
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
  :categoryId
----------------------------------------------------
*/
describe('GET /api/ads/categories/:categoryId', () => {
  it('should fetch advertises based upon category id as json', (done) => {
    request(app)
    .get('/api/ads/categories/1')
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
  Advertises Controller: POST /api/ads
----------------------------------------------------
*/
describe('POST /api/ads', () => {
  it('should create a new advertise', (done) => {
    request(app)
    .post('/api/ads')
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
  Advertises Controller: POST /api/:id/upload
----------------------------------------------------
*/
describe('POST /api/:id/upload', () => {
  it('should upload a photos for advertise', (done) => {
    request(app)
    .post('/api/ads/1/upload')
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
  Advertises Controller: PUT /api/ads/:id
----------------------------------------------------
*/
describe('PUT /api/ads/:id', () => {
  it('should modify a existing advertise', (done) => {
    request(app)
    .put('/api/ads/:id')
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
describe('PUT /api/ads/:id/sells', () => {
  it('should modify a existing advertise status', (done) => {
    request(app)
    .put('/api/ads/1/sells')
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
    request(app)
    .delete('/api/ads/1')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      expect(res.body.message).toBe('Success')
      done()
    })
  })
})

