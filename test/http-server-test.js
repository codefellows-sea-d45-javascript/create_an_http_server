var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

require(__dirname + '/../lib/http-server.js');

describe('this server', function(){
  before(function(){
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should respond to root level requests by serving index.html', function(done){
    chai.request('localhost:3000')
    .get('/')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(this.indexFileString);
      done();
    }.bind(this));
  });


  it('should give the current time for requests to /time');



  it('should greet "xxx" someone for requests to /greet/xxx');


  it('should respond do POST requests at /greet');


  it('should respond with 404 to all other requests');

});
