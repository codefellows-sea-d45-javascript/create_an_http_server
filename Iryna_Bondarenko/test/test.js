'use strict';
var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);

require(__dirname + '/../server');

describe('our server', function(){
 it('should  get the time', function(done){
   chai.request('localhost:3000')
   .get('/time')
   .end(function(err, res){
		expect(err).to.eql(null);
		expect(res).to.have.status(200); 
		done();
   });
 });

it('should  get the name as parameter and greet the name', function(done){
   chai.request('localhost:3000')
   .get('/greet/name')
   .end(function(err, res){
		expect(err).to.eql(null);
		expect(res).to.have.status(200); 
		done();
   });
 });

it("should  post JSON string with some name", function(done){
   chai.request('localhost:3000')
   .post('/greet/name')
   .end(function(err, res){
		expect(err).to.eql(null);
		expect(res).to.have.status(200); 
		done();
   });
 });
});