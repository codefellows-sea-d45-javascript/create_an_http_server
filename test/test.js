var chai = require('chai')
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
require(__dirname + '/../http_server');

describe('our server', function(){
  it('should be able to get an index', function(done){
    chai.request('http://localhost:3000')
      .get('/')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
    });
  });
  it('should print the current date information', function(done){
    chai.request('http://localhost:3000')
      .get('/time')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res.text.substring(0,3)).to.eql('The');
        done();
      });
  });
});
