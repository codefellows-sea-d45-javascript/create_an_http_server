var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');

//we don't store the server in a var we just 
//start the server?
require(__dirname + '/../lib/server');



describe('an http request', function() {
  it('should have status 200', function() {
    chai.request('http://localhost:3000')
      .get('/')
      .then(function (res) {
        console.log(res);
        expect(res).to.have.status(200);
      });  
  });
});


describe('our server', function() {
  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should be able to get an index', function(done) {
    
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
       
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.indexFileString);
        done();
      }.bind(this));
  });
  after(function(){
  	console.log('after');
  })
});

describe('our server', function(){
	it('should be able to get the time', function(done){
		chai.request('localhost:3000')
		.get('/time')
		.end(function(err, res){
			expect(err).to.eql(null);
			expect(res).to.have.status(200); 
			done();
		});
	});
});
