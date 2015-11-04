var http = require('http');
var fs = require('fs');
var ReadStream = require('stream').Readable;
var greet = require(__dirname + '/greet.js');
var qs = require('querystring');

var server = http.createServer(function(req, res) {
  var resData = {};

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
    console.log('/greet');
    resData.status = 200;
    req.on('data', function(data) {
      resData.data += data;
      console.log(resData.data);
      if(resData.data.length > 1e7) {
        res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
        res.end('');
      }
    });
    req.on('end', function() {
      json = qs.parse(resData.data);
      console.log(json["lastName"], 'THIS IS THE NAME');
      console.log(json["undefinedfirstName"], 'THIS IS THE NAME');
    });

  }

  if (req.url === '/greet/name' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = (json["undefinedfirstName"] + ' ' + json["lastName"]) || 'You must provide a name first!';
  }

  if (req.url === '/awesome' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({hello: 'world'});
  }

  res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'
  });
  res.write(resData.data || 'not found');
  res.end();

});

server.listen(3000, function() {
  console.log('server up');
});


