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

function writeTime (request) {
  var resData = {};
  resData.status = 200;
  resData.data = new Date().toString();
  return resData;
}

function greetName (request, name) {
  var resData = {};
  resData.status = 200;
  resData.data = 'Hello ' + name + '!';
  return resData;
}

function writeJSON (request, name) {
  var resData = {};
  resData.status = 200;
  resData.contentType = 'application/json';
  resData.data = JSON.stringify({hi: name});
  return resData;
}


function onRequest(request, response) {
  var resData = {};
  var name = request.url.split('/')[2];

  // var queryObject = url.parse(request.url, true);
  // console.log(queryObject);

  if(request.method == 'GET' && request.url == '/') {
    resData.status = 200;
    resData.contentType = "text/html";
    // resData.
    // response = fs.createReadStream(__dirname + "/public/index.html");
    // .pipe(response);
  }
  if(request.url === '/time' && request.method === 'GET') {
    console.log('time');
    resData = writeTime(request);
  }
  if(request.url === '/greet/' + name && request.method === 'GET') {
    console.log('greet' + name);
    resData = greetName(request, name);
  }
  if(request.url === '/greet/' + name && request.method === 'POST') {
    console.log('post greet ' + name);
    resData = writeJSON(request, name);
  }


  sendResponse(response, resData);
}

http.createServer(onRequest).listen(3000);
console.log("Server is up");
