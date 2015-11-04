var http = require('http');
var url = require('url');

function start(router, route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    router(route, pathname, response, request);
  }

  var server = http.createServer(onRequest).listen('3000');
  console.log('Server running');
}

exports.start = start;

