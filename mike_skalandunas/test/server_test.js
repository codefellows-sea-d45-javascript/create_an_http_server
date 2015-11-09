'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server.js');

describe('our server', function() {
  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
  })

  it('should be able to get an index', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.indexFileString);
        done();
      }.bind(this));
  })

  it('should be able to return a name', function(done) {
    chai.request('localhost:3000')
      .get('/greet/idempotent')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello idempotent');
        done();
      })
  })

  it('should return time and date to /time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Current server time: ' + new Date().toString());
        done();
      })
  })
})
