'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server');

describe('GET /', function() {
  before(function() {
    this.indexFile = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should send index.html', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.indexFile);
        done();
      }.bind(this));
  });
});

describe('GET /time', function() {
  it('should send back time: (PST)', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text.split(' ').pop()).to.eql('(PST)');
        done();
      });
  });
});

describe('GET greet/:name', function() {
  it('should greet you by name', function(done) {
    chai.request('localhost:3000')
      .get('/greet/test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello test!');
        done();
      });
  });
});

describe('POST greet/', function() {
  it('should greet your JSON', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .field('name', 'test')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello test!');
        done();
      });
  });
});
