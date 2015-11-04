var http = require('http');
var requestHandler = require('./requesthandler');
// test("server.js");

var server = http.createServer(function(request, response) {
  if (request.url === '/time') {
    requestHandler.time(request, response);
  }
});

server.listen(3000, function() {
  console.log('server running on port 3000');
});
