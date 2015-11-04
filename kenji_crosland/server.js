'use strict';
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(request, response) {
//Create a path array variable to split the URL into segments
var pathArray = request.url.split('/');

if (request.url === '/' && request.method === 'GET' ){
  fs.readFile('./public/index.html', function(err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text/html"});
    var htmlString = data.toString().replace("{{Name}}", "");
    response.write(htmlString);
    response.end();
  });
}
if (pathArray[1] === 'greet' && request.method === 'GET') {
  console.log(pathArray);
  fs.readFile('./public/index.html', function(err, data) {
    if (err) throw err;
    console.log('greet!');
    //Need an if statement
    response.writeHead(200, {"Content-Type": "text/html"});
    var htmlString = data.toString().replace("{{Name}}", " " + pathArray[2]);
    response.write(htmlString);
    response.end();
  });
}

if (pathArray[1] === 'greet' && request.method === 'POST') {
  console.log("POST");
  var body = "";
  //Got some help here https://davidwalsh.name/nodejs-http-request
  request.on('data', function(chunk){
    console.log(chunk);
    body+= chunk;
  });
  //And here: http://stackoverflow.com/questions/15427220/how-to-handle-post-request-in-node-js
  request.on('end', function(){
    var parsed = JSON.parse(body);
    response.writeHead(200, {"Content-Type": "application/json"});
    console.log("Hello: " + parsed.name);
    response.write(JSON.stringify(parsed));
    response.end();
  });
}

});

server.listen(3000, function(){
  console.log('server is up!');
});

