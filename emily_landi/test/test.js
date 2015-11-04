var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

require(__dirname + '/../server');

//almost works
describe('http server', function() {
  it('should respond to a get request to /time', function(done) {
    var date = new Date();
    var time = date.toString();
    chai.request('localhost:3000')
    .get('/time')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql(time);
      done();
    });
  });
});


