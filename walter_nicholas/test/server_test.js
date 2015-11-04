var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server');
var indexFileString;

describe('our server', function() {

  before(function() {
    indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should be able to get an index file', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(indexFileString);
        done();
      })
  });

  it('should greet a person', function(done) {
    chai.request('localhost:3000')
      .get('/greet/' + 'anystring')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello anystring!');
        done();
      })
  });

  it('should respond to a post request', function(done) {
    chai.request('localhost:3000')
      .post('/greet')
      .send({name : 'anystring'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello anystring');
        done();
      })
  });

});
