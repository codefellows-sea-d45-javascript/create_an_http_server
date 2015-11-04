var http = require('http');
var fs = require('fs');
var ReadStream = require('stream').Readable;

var server = http.createServer(function(req, res) {
  var resData = {};
  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
  }

  if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = Date();
    //resData.data = JSON.stringify({hello: 'world'});
  }

  if (req.url === '/greet' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/greet.html');
  }

  /*if (req.url === '/greet/name' && req.method === 'GET') {
    res.Data.status = 200;
    resData.contentType = "application/json";
    resData.data = //JSON.stringify({hello: 'NAME'})
  }*/

  res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'
  });
  res.write(resData.data || 'not found');
  res.end();
});

server.listen(3000, function() {
  console.log('server up');
});
