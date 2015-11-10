
'use strict'

var fs = require('fs');
var url = require('url');

// Respond to a request to /time that will send back the current time of the server.

if(request.url === '/time' && request.method.toLowerCase() === 'get') {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(new Date().toString());
}

// Respond to a get request to /greet/name where name is any single word string.

if(request.url === '/greet/name' && request.method.toLowerCase() === 'get') {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello ' + name + '!');
});

if(request.url === '/greet' && request.method.toLowerCase() === 'post') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello ' + name + '!');
}
