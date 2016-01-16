var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server.js');

describe('the server', function() {
  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../lib/index.html').toString();
  });

  it('should be able to get an index', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(this.indexFileString);
        console.log(res);
        done();
      }.bind(this));  //uses a node-style callback. Angular uses promise-style callback
  });
});
