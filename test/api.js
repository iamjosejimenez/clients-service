'use strict';

const supertest = require('supertest');
const app = require('../server/server');

describe('when accesing the main root', () => {
  const request = supertest.agent(app);
  let server;
  const endpoint = '/api/v1';

  before(function(done) {
    server = app.listen(done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should return 200', () =>
    request
      .get('/')
      .set('Authentication', 'jacquelynblankenship@quotezart.com')
      .expect('Content-Type', /json/)
      .expect(200)
  );

  it('should return 401 without authentication', () =>
    request
      .get('/')
      .expect('Content-Type', /json/)
      .expect(401)
  );
});
