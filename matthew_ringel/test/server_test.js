var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../index');

describe('our server', function() {

  it('should respond to a GET request to /time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(error, response) {
          expect(error).to.eql(null);
          expect(response).to.have.status(200);
          done();
      });
  });

  it('should respond to a GET request to /greet/[name]', function(done) {
    chai.request('localhost:3000')
      .get('/greet/name')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should respond to a POST request to /greet with JSON data', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .send({"name": "bob"})
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);
        done();
      });
  });


});
