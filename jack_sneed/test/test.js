'use strict';

var server = require(__dirname + '/../server');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

describe('time', function() {

  it('should return a time request', function(done) {
    chai.request('localhost:8000')
    .get('/time')
    .end(function(response) {
      expect(response).to.have.status(200);
      done();
    });
  });
});

describe('greet GET', function() {

  it('should return a greet GET request', function(done) {
    chai.request('localhost:8000')
    .get('/greet')
    .end(function(response) {
      expect(response).to.have.status(200);
      done();
    });
  });
});

describe('greet POST', function() {

  it('should return a greet POST request', function(done) {
    before(function() {
      chai.request('localhost:8000')
      .post('/greet')
      .send({name: 'POST'})
      .end(function(error, response) {
        expect(response).to.have.status(200);
        expect(response.name).to.equal('Comment allez-vous POST');
      });
    });
    done();
  });
});
