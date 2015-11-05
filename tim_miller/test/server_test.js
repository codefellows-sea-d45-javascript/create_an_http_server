var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server.js');

describe('our server', function() {

  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should be able to get an index', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        console.log(err);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.indexFileString);
        done();
      }.bind(this));
  });

  it('should respond to /time by sending back the current time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.be.below(JSON.stringify(new Date()));
        done();
      });
  });

  it('should respond to /greet/* with the name you send it', function(done) {
    chai.request('localhost:3000')
      .get('/greet/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('<h1>HELLO test</h1>');
        done();
      });
  });

});

