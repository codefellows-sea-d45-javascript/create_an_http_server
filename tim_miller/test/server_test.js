var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server.js');

describe('our server', function() {

  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
    chai.request('localhost:3000')
      .post('/greet')
      .field('undefinedfirstName', 'test')
      .field('lastName', 'test');
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

  it('should respond to /greet/name with the name you send it', function(done) {
    chai.request('localhost:3000')
      .get('/greet/name')
      .end(function(err, res) {
        expect(res).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('test');
        done();
      });
  });

  it('the root page should return all possible routes', function(done) {
    chai.request('localhost:3000')
      .post('/root')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(['/', '/time', '/greet', '/greet/name', '/root']);
        done();
      });
  });
});

