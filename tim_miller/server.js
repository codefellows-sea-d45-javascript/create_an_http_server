var http = require('http');
var fs = require('fs');
var ReadStream = require('stream').Readable;
var greet = require(__dirname + '/greet.js');
var lodash = require('lodash');

var server = module.exports = http.createServer(function(req, res) {
  var resData = resData || {};

  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
  }

  if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify(new Date());
  }

  if (req.url === '/greet' && req.method === 'POST') {
    resData.status = 200;
    req.on('data', function(data) {
      resData.data = data;
      resData.data = JSON.parse(resData.data);
      if(resData.data.length > 1e7) {
        res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
        res.end('');
      }
    });

    req.on('end', function() {
      res.writeHead(resData.status || 404, {
        'Content-Type': resData.contentType || 'text/plain'
      });
      res.write(JSON.stringify(resData.data) || 'not found');
      res.end();
    });

  }

  if (lodash.includes(req.url, '/greet/') && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = "<h1>HELLO " + req.url.split('/')[2] + "</h1>";
  }


  if (req.url === '/awesome' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({hello: 'world'});
  }

  if(req.method !== 'POST') {
    res.writeHead(resData.status || 404, {
      'Content-Type': resData.contentType || 'text/plain'
    });
    res.write(resData.data || 'not found');
    res.end();
  }
});

server.listen(3000, function() {
  console.log('server up');
});


