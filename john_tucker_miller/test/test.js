var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
var server = require(__dirname + '/../server');

describe('get request to /time: ', function() {

  it('should respond with a date', function(done) {
    chai.request(server)
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        // makes sure routing works properly
        expect(res.text.length).to.eql(15);
        // the date is being sent as a DateString, which has has a length of 15
        done();
      });
  });
});

describe('requests to /greet', function(done) {
  it('should respond to get request to /greet/testname by greeting testname', function(done) {
    chai.request(server)
      .get('/greet/testname')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('yo whats up testname');
        done();
      });
  });
  it('should respond to post request by greeting the name in req body', function(done) {
  chai.request(server)
    .post('/greet')
    .send({"name": "johnny"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('yo whats up johnny');
      done();
    });
  });
});
