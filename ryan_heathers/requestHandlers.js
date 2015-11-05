var fs = require('fs');
var url = require('url');

function index(response) {
  var content = fs.readFileSync(__dirname + "/views/index.html");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(content);
  response.end();
}

function time(response) {
  var time = new Date().getTime();
  var date = new Date(time);
  response.write("The current server time is: " + date);
  response.end();
}

function greet(response) {
  var content = fs.readFileSync(__dirname + "/views/greet.html");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(content);
  response.end();
}

function greetName(response, name) {
  response.write("How's your day going, " + name.toUpperCase() + '?');
  response.end();
}

function postGreeting(response, request) {
  var query = url.parse(request.url, true).query;
  var json = JSON.stringify(query);

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Thanks for your submission of: " + query.name);
  response.end();
}

exports.index = index;
exports.time = time;
exports.greet = greet;
exports.greetName = greetName;
exports.postGreeting = postGreeting;
