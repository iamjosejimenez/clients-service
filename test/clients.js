'use strict';

const supertest = require('supertest');
const app = require('../server/server');

describe('when getting clients', () => {
  const request = supertest.agent(app);
  let server;
  const endpoint = '/api/v1/clients';

  before(function(done) {
    server = app.listen(done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should return 200 with an admin', () =>
    request
      .get(endpoint)
      .set('Authentication', 'jacquelynblankenship@quotezart.com')
      .expect('Content-Type', /json/)
      .expect(200)
  );

  it('should return 200 with an user', () =>
    request
      .get(endpoint)
      .set('Authentication', 'sherrieblankenship@quotezart.com')
      .expect('Content-Type', /json/)
      .expect(200)
  );
});
