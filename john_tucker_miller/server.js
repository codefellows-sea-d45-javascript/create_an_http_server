var http = require('http');
var fs = require('fs');
var ReadStream = require('stream');
var url = require('url');

var server = http.createServer(function(req, res) {

  var name = req.url.split('/')[2];

  if (req.method === 'GET' && req.url === '/time') {
    var date = new Date();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(date.toDateString());
    res.end();
  }

  if (req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('yo watz good ' + name);
    res.end();
  }

  if (req.method === 'POST' && req.url === '/greet') {
    var body = '';

    req.on('data', function(data) {
      body += data.toString();
    });

    req.on('end', function() {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Why hello, my esteemed colleage ' + JSON.parse(body).name);
      res.end();
    });


  }

});

server.listen(3000);
