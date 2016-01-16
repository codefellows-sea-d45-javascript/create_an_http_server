var http = require('http');
var PORT = 3000;
var fs = require('fs');

var routesAvailable = {
  root: '/',
  currentTime: '/time',
  greet: '/greet',
  greetName: '/greet/yourname'
};

var server = http.createServer(function(req, res) {
  var resData = {};

  if(req.url === routesAvailable.root && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/lib/index.html').toString();
  }
  if(req.url === '/style.css') {
    res.writeHead(200, {
      'Content-Type': 'text/css'
    });
    res.write(fs.readFileSync(__dirname + '/lib/style.css'));
      return res.end();
  }
  if(req.url === routesAvailable.currentTime && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = new Date().getTime().toString();
  }
  if(req.url === routesAvailable.greet && req.method === 'POST') {

  }
  res.writeHead(resData.status || 400, {
    'Content-Type' : resData.contentType || 'text/plain'
  });
  res.write(resData.data || 'not found');
  res.end();
});

server.listen(PORT, function() {
  console.log('Server listening on http://localhost:%s', PORT);
});

/* The server should respond to a request to /time that will send back
the current time of the server. */

