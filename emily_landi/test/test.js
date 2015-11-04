var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

require(__dirname + '/../server');

describe('http server', function() {
  it('should respond to a get request to /time', function(done) {
    var date = new Date();
    var time = date.toString();
    chai.request('localhost:3000')
    .get('/time')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('{"time":"' + time + '"}');
      done();
    });
  });

  it('should respond to a post request to /greet', function(done) {
    chai.request('localhost:3000')
    .post('/greet')
    .send('{"greeting":"hello bob"}')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('{"greeting":"hello bob"}');
      done();
    });
  });

  it('should respond to a get request to /greet', function(done) {
    chai.request('localhost:3000')
    .get('/greet')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('{"greeting":"hello stranger!"}');
      done();
    });
  });

  it('should send 404', function(done) {
    chai.request('localhost:3000')
    .get('/something')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(404);
      expect(res.text).to.eql('404 - Page cannot be found!');
      done();
    });
  });
});
