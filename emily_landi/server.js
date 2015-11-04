var http = require('http');
var fs = require('fs');

var GetTime = require(__dirname + '/public/time');
var SayHello = require(__dirname + '/public/greet');

var server = http.createServer(function(req, res) {
  //index *can't get css pulled in
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(fs.readFileSync(__dirname + '/public/index.html'));
    // res.end(fs.readFileSync(__dirname + '/public/style.css'));
  }
  //greet
  else if (req.url === '/greet' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    var sayHello = new SayHello();
    res.write(JSON.stringify(sayHello));
    res.end();
  }
  //greet - POST
  else if (req.url === '/greet' && req.method === 'POST') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    req.on('data', function(data) {
      var body = JSON.parse(data.toString());
      res.write(JSON.stringify(body));
      res.end();
    });
  }
  //greet/name - GET
  else if (req.url.split('/greet/')[1] && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify({greeting:'hello ' + req.url.split('/greet/')[1]}));
    res.end();
  }
  //time
  else if (req.url === '/time' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    var getTime = new GetTime();
    res.write(JSON.stringify(getTime));
    res.end();
  }
  //other - 404
  else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('404 - Page cannot be found!');
    res.end();
  }
});

server.listen('3000', function() {
  console.log('Server is up.');
});
