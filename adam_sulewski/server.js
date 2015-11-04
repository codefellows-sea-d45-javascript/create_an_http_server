'use strict';

//  ROUTES:
//    /TIME SENDS CURRENT TIME
//    /GREET/NAME GREETS NAME PARAM IN URL
//    POST TO GREET/ HANDLES JSON AND GREETS JSON
//  TEST USING CHAI-HTTP
//  BONUS POINTS:
//    AUTOPOPULATE ROUTES IN INDEX.HTML
//    STYLE INDEX.HTML

var http = require('http');
var route = require(__dirname + '/lib/route');
var PORT = 3000;

var server = http.createServer(function(req, res) {
  debugger;
  route(req, res);
});

server.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
