'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');

function sendResponse(response, resData) {
  response.writeHead(resData.status || 404, {
    "Content-Type": resData.contentType || "text/plain"
  });
  response.write(resData.data || "Error 404: Page not found!");
  response.end();
}

function writeObject (request) {
  var resData = {};
  resData.status = 200;
  resData.contentType = 'application/json';
  resData.data = JSON.stringify({hello: 'world'});
  return resData
}
function writeTime (request) {
  var resData = {};
  resData.status = 200;
  resData.data = new Date().toString();
  return resData
}

function greetName (request, name) {
  var resData = {};
  resData.status = 200;
  resData.data = 'Hello ' + name;
  return resData
}


function onRequest(request, response) {
  var resData = {};
  var name = request.url.split('/')[2];

  var queryObject = url.parse(request.url, true);
  // console.log(queryObject);

  if(request.method == 'GET' && request.url == '/') {
    resData.status = 200;
    resData.contentType = "text/html";
    resData.data = fs.createReadStream(__dirname + "/public/index.html");
    // .pipe(response);
  }
  if(request.url === '/time' && request.method === 'GET') {
    console.log('time')
    resData = writeTime(request);
    console.log(resData);
  }
  if(request.url === '/greet/' + name && request.method === 'GET') {
    console.log('greet name')
    resData = greetName(request, name);
  }


  sendResponse(response, resData);
}

http.createServer(onRequest).listen(3000);
console.log("Server is up");
