'use strict';

var http = require('http');
var route = require(__dirname + '/lib/route');
var PORT = 3000;

var server = http.createServer(function(req, res) {
  route(req, res);
});

server.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
