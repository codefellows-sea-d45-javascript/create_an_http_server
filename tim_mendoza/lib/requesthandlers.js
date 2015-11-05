var fs = require('fs');

function start(response, request) {
  console.log('start');

  var body = fs.readFileSync(__dirname + '/../public/index.html');
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function css(file, response, request) {
  console.log('css');

  var body = fs.readFileSync(__dirname + '/../public/' + file);
  response.writeHead(200, {"Content-Type": "text/css"});
  response.write(body);
  response.end();
}

function greet(response, request, name) {
  console.log('greet');
  
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("hello " + name);
  response.end(); 
  
 
}

function time(response) {
  console.log('time');
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write('The current unix epoch time is ' + Date.now().toString());
  response.end();
}

exports.start = start;
exports.greet = greet;
exports.time = time;
exports.css = css;