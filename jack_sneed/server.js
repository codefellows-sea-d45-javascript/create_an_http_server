'use strict';

var http = require('http');
var fs = require('fs');
var date = new Date();
var time = date.toTimeString();
var localeDate = date.toLocaleDateString();

var server = http.createServer(function(request, response) {

  var urlPath = request.url.split('/');
  var url = request.url;

  function resWriteHead(status, contentType) {
    response.writeHead(status, {
    'Content-Type': contentType
    });
  };

  if (url === '/') {
    var htmlData = fs.readFileSync('./public/index.html').toString();
    resWriteHead(200, 'text/html');
    response.write(htmlData);
    return response.end();

  } else if (urlPath[1] === 'time') {
      resWriteHead(200, 'text/plain');

      response.write(time + ' ' + localeDate);
      return response.end();

  } else if (urlPath[1] === 'greet' && request.method === 'GET') {

      resWriteHead(200, 'text/plain');
      response.write('Comment allez-vous ' + urlPath[2] + '!');
      return response.end();

  }
    if (request.method === 'POST') {

    request.on('data', function(err, data) {
      var parseData = JSON.parse(data);

      resWriteHead(200, 'text/plain');
      response.write(JSON.stringify({name: 'Comment allez-vous ' + parseData.name}));
      return response.end();
    });

    } else {

      resWriteHead(404, 'text/plain');

      response.write('Sorry, page not found');
      return response.end();
    }
});

server.listen(8000, function() {
  console.log('server started on localhost:8000');
});
