'use strict';

var fs = require('fs');
var http = require('http');

function frog(word) {
  return word.split('/greet/').pop();
}

var server = http.createServer(function(req, res) {
  var resData = {};
  var name = req.url.split('/')[2];

  if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = 'Current server time: ' + new Date().toString();
  }

  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
  }

  if (req.url === '/greet/' + name && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = 'Hello ' + name;
  }

  if (req.url === '/greet/' + name && req.method === 'POST') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({Hello: name});
  }


  res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'
  });

  res.write(resData.data || 'not found');
  res.end();
})

server.listen(3000, function() {
  console.log('server up');
})
