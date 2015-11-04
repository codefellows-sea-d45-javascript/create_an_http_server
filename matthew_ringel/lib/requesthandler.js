var url = require('url');
var qs = require('querystring');

function greet(request, response) {
  var name = url.parse(request.url).pathname.split('/').pop();
  var body = "Hello " + name.toString();
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(body);
  response.end();
}

function time(request, response) {
  var date = new Date();
  var time = date.toUTCString();
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(time);
  response.end();
}

function greetJSON(request, response) {
  console.log('handling POST greet with JSON');
  var postData = '';
  request.on('data', function (data) {
    postData += data;
  });
  request.on('end', function() {
    var postName = JSON.parse(postData);
    console.log('Received JSON: ');
    console.dir(postName);
    console.log(postName.name);

    var name = postName.name;
    var body = "hello " + name.toString();
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(body);
    response.end();
  });
}

exports.greet = greet;
exports.time = time;
exports.greetJSON = greetJSON;
