'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../lib/server.js');
var fs = require('fs');

describe('a GET request to to "/"', function(){

  it('should respond with an html file', function(done){
    chai.request('http://localhost:3000')
        .get('/')
        .end(function(err, res){
          expect(res).to.have.status(200);
          expect(res.text).to.include('<!DOCTYPE "html">');
          //expect(res.text).to.equal(this.htmlIndex);
          done();
        }.bind(this));
  });
});

describe('a GET request to greet/name', function() {

  describe('when the name is a single word string', function(){

    it('should send back a string that greets that name', function(done){
      chai.request('http://localhost:3000')
        .get('/greet/Cornelius')
        .end(function(err, res){
          expect(res.text).to.include('Cornelius');
          expect(res.text).to.not.include('{{Names}}');
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('a POST request to /greet', function(){

  it('should be able to take a name in JSON format', function(done){
      chai.request('http://localhost:3000')
        .post('/greet')
        .send({ name: 'Cornelius' })
        .end(function(res){
          expect(res.text).to.equal('{"name":"Cornelius"}');
          expect(res).to.have.status(200);
          done();
        });
  });
});


