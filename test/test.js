
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server');

describe('GET', function() {
  before(function() {
    this.indexFile = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should be able to get an index', function(done) {
    debugger;
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, response) {
        debugger;
        expect(err).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text).to.eql(this.indexFileString);
        done();
      }.bind(this));
  });
});

describe('GET /time', function() {
  it('should send back time: (PST)', function(done) {
   chai.request('localhost:3000')
      .get('/time')
      .end(function(err, response) {
        expect(err).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text.split(' ').pop()).to.eql('(PST)');
        done();
      });
  });
});

describe('GET greet/:name', function() {
    it('should greet by name', function(done) {
     chai.request('localhost:3000')
      .get('/greet/test')
      .end(function(err, response) {
        expect(err).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text).to.eql('Hello!');
        done();
      });
  });
});

describe('POST greet/', function() {
  it('should greet your name', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .end(function(err, response) {
        expect(err).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text).to.eql('Hello test!');
        done();
      });
  });
});

