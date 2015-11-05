var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

require(__dirname + '/../lib/http-server.js');

describe('this server', function(){

  before(function(){
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
    this.name = "kenji";
    this.JSON = {"name": "bob"};

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

  it('should greet "xxx" someone for requests to /greet/xxx', function(done){
    chai.request('localhost:3000')
    .get('/greet/' + this.name)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
       expect(res.text).to.eql('Well hello there, ' + this.name);
      done();
    }.bind(this));

  });

  it('should respond to GET requests to /time', function(){
       chai.request('localhost:3000')
    .get('/time')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });

  });

  it('should respond to GET requests at /greet with a 404 (because this route is reserved for POST' , function(){
    chai.request('localhost:3000')
    .get('/greet')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      done();
    });
  });

   it('should respond to POST requests at /greet when JSON data is sent with a message greeting the value of "name" in the JSON' , function(done){
    chai.request('localhost:3000')
    .post('/greet')
    .send(this.JSON)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql("Howdy, " + this.JSON.name + '!');
      done();
    }.bind(this));
  });


  it('should respond with 404 to all other requests', function(done){
    chai.request('localhost:3000')
    .get('/someotherpath')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      done();
    }.bind(this));
  });
});
