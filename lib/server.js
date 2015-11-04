
// Create web server
var router = require(__dirname + '/lib/route');

var http = require('http');
http.createServer(function(request, response) {
  homeRoute(request, response);
}).listen(3000);
console.log('Server up and running');

var server = http.createServer(function(request, res)
