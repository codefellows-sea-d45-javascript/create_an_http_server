var chai = require('chai');
var chaihttp = require('chai-http');
require(__dirname + '/../httpServer.js');
var fs = require('fs');
chai.use(chaihttp);
var expect = chai.expect;
var host = 'localhost:3030';
var file = fs.readFileSync(__dirname + '/../public/index.html').toString();


describe('our server', function(){

  it('should be able to repsond with a status and not an error', function(done) {
    chai.request(host)
      .get('/')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should be able to get html', function(done) {
    chai.request(host)
      .get('/')
      .end(function (err, res) {
        expect(res.text).to.eql(file);
        done();
    });
  });

  it('should be able to get name', function(done) {
    chai.request(host)
      .get('/greet/Dustin')
      .end(function (err, res) {
        expect(res.text).to.equal('hello there, Dustin.');
        done();
      });
  });

  it('should be able to get time', function(done) {
    chai.request(host)
      .get('/timer')
      .end(function (err, res) {
        expect(res.text).to.equal('Time is currently: ' + new Date().toLocaleTimeString());
        done();
      });
  });
/*
  it('should be able to post name', function(done) {
    chai.request(host)
      .post('/greet/Dustin')
      .send(JSON.stringify({'name': 'Dustin'}))
      .end(function (err, req) {
        expect(req.text).to.equal({"name":"Dustin"});
        console.log(res);
        done();
      });
  });*/
});
