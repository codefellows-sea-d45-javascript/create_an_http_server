var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');

var server = require(__dirname + '/../lib/server.js');

describe('our server', function() {
  before(function() {
    //this.indexFileString = fs.readFileSync(__dirname
    //  + '/../public/index.html').toString();
    var date = new Date();
    this.time = date.toLocaleTimeString();

    this.name = 'tina';
  });

  it('should be able to get the current time', function(done) {
    chai.request('localhost:3000')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql("The current time in Seattle is : " + this.time);//eql(this.indexFileString);
        done();
      }.bind(this));
  });

  it('should be able to get the greeting', function(done) {
    chai.request('localhost:3000')
      .get('/greet/tina')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql("Hello there, " + this.name);
        done();
      }.bind(this));
  });

  it('should be able to get the greeting', function(done) {
    chai.request('localhost:3000')
      .post('/greet/tina')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"name":"tina"}');
        done();
      }.bind(this));
  });
});
