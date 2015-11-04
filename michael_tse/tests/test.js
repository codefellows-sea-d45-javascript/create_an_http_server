var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server');

describe('our server', function() {
  before(function() {
    this.indexFileString = fs.readFileSync(__dirname + '/../public/index.html').toString();
  });

  it('should be able to get an index', function(done) {
    console.log('please run!');
    chai.request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      }.bind(this));
  });
});

  // it('should test the time', function() {
  //   chai.request('http://localhost:3000')
  //   .get('/time')
  //   .then(function (response) {
  //     console.log('test time');
  //     // expect(request).to.be.text;
  //     expect(response).to.have.status(200);

  //   });


  // });

  // it('should test the time', function() {
  //   chai.request('http://localhost:3000')
  //   .post('/greet')

  // })

