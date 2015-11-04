var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server');

describe('test /time route', function() {
  it('should find a valid page', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      }.bind(this));
  });
});

describe('test /greet route', function() {
  it('should find a valid page', function(done) {
    chai.request('localhost:3000')
      .get('/greet/bert')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      }.bind(this));
  });
});
