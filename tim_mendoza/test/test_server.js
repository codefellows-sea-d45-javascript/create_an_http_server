var chai = require('chai');
var expect = require('chai').expect;
var mocha = require('mocha');
var chaihttp = require('chai-http');
var fs = require('fs');
require(__dirname + '/../index');

chai.use(chaihttp);

describe('the /time GET route', function() {
  it('should tell you the time', function(done) {
    chai.request('localhost:8888')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text.slice(0, 30)).to.equal("The current unix epoch time is");
        done();
      });
  });
});
describe('the /greet/name GET route', function() {
  it('should say hello to the name provided', function(done) {
    chai.request('localhost:8888')
      .get('/greet/tim')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal("hello tim");
        done();
      });
  });
});
describe('the /greet POST route', function() {
  it('should say hello to the name provided in a JSON object', function(done) {
    chai.request('localhost:8888')
      .post('/greet')
      .send('{"name":"tim"}')
      .end(function(err, res) {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal("hello tim");
        done();
      });
  });
});
describe('the / GET route', function() {
  it('should display /public/index.html', function(done) {
    chai.request('localhost:8888')
      .get('/')
      .end(function(err, res) {
        debugger;
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res.text).to.equal(fs.readFileSync(__dirname + '/../public/index.html').toString());
        done();
      });
  });
  it('should return CSS files', function(done) {
  chai.request('localhost:8888')
    .get('/main.css')
    .end(function(err, res) {
      debugger;
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.equal(fs.readFileSync(__dirname + '/../public/main.css').toString());
      done();
    });
  });
});

