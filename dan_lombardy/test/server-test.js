"use strict";
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs');
var router =require(__dirname + '/../lib/router');
require(__dirname + '/../index');

/*before('running', function(){
  this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
});
*/

describe('a server that returns the right routes', function(){
  before(function() {
      this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
    });

    it('a call to "/" should return an html page', function(done){
      chai.request('localhost:3000')
      .get('/')
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type');
        expect(res).to.be.html;
        expect(res.text).to.eql(this.indexFileString);
        done();
      }.bind(this));

    });

    it('a call to /greet will return plain text', function(done){
      chai.request('localhost:3000')
      .post('/greet')
      .send({name: "spike"})
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type');
        expect(res).to.be.text;
        expect(res.text).to.eql("You have posted your name");
        done();
      }.bind(this));
    });

    it('a call to /greet/name will return plain text', function(done){
      chai.request('localhost:3000')
      .get('/greet/name')
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type');
        expect(res).to.be.text;
        expect(res.text.slice(0,5)).to.eql("hello");
        done();
      }.bind(this));
    });

    it('a call to /server will return plain text', function(done){
      chai.request('localhost:3000')
      .get('/server')
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type');
        expect(res).to.be.text;
        expect(res.text.slice(0,3)).to.eql("The");
        done();
      }.bind(this));
    });





});
