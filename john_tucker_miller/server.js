var http = require('http');
var fs = require('fs');
var ReadStream = require('stream');

var server = http.createServer(function(req, res) {
  var resdata = {};
  if (req.url === '/time' && req.method === 'GET') {
    // respond with the server's time
  }

  if (req.url === '/greet' && req.method === 'GET') {
    // respond with a greeting
  }

});

server.listen(3000, function() {
  console.log('server up');
});
