var mocha = require('mocha');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = chai.expect;
var url = "http://localhost:3000";
require(__dirname + "/../server.js");

describe('server.js', function() {
  it('should accept a request at "/" with status code 200', function(done) {
    chai.request(url).get('/').end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    })
  })

  it('should return a time from "/time"', function() {

  })
})

// Tim Miller's tests

describe('our server', function(done) {
  before(function() {
    this.indexFileString= fs.readFileSync(__dirname + '/../public/index.html').toString();
  })

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

  })

  it('should espond to /time with the current time', function() {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.be.below(JSON.stringify(new Date()));
        done();
      })
  })

  it('should respond to /greet/* with the *name', function(done) {
    chai.request('localhost:3000')
      .get('/greet/TEST')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.eql("Hello, TEST");
      })
  })

});

