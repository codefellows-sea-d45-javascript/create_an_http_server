var http = require('http');
var url = require('url');
var fs = require('fs');

var requestHandler = require('./requesthandler');

var server = http.createServer(function(request, response) {

  if (request.url === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    data = fs.readFileSync(__dirname + '/../public/index.html');
    response.write(data || 'not found');
    response.end();
  }

  if (request.url === '/time') {
    requestHandler.time(request, response);
  }
  if (url.parse(request.url).pathname.split('/').length === 3 &&
    url.parse(request.url).pathname.split('/')[1] === 'greet' &&
    request.method === 'GET') {
      requestHandler.greet(request, response);
    }
  if (request.method === 'POST' && request.url === '/greet') {
    requestHandler.greetJSON(request, response);
  }
});

server.listen(3000, function() {
  console.log('server running on port 3000');
});
