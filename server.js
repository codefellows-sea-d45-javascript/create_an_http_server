'use strict';

var http = require('http');
var date = new Date();
var time = date.toTimeString();
var localeDate = date.toLocaleDateString();

var server = http.createServer(function(request, response) {

  var urlPath = request.url.split('/');

  if (request.url === '/time') {
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    response.write(time + ' ' + localeDate);
    return response.end();
  }

  if (urlPath[1] === 'greet' && request.method === 'GET') {

    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.write('Comment allez-vous ' + urlPath[2] + '!');
    return response.end();

  } else if (request.method === 'POST') {

      request.on('data', function(err, data) {
        var parseData = JSON.parse(data);

        response.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        response.write(JSON.stringify({name: 'Comment allez-vous ' + parseData.name}));
        return response.end();
    });

  } else {

      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write('Sorry, page not found');
      return response.end();
    }
});

server.listen(8000, function() {
  console.log('server started on localhost:8000');
});