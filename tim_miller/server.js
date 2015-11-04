var http = require('http');
var fs = require('fs');
var ReadStream = require('stream').Readable;

var server = http.createServer(function(req, res) {
  var resData = {};

  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.createReadStream(__dirname + '/public/index.html').toString();
  }

  if (req.url === '/awesome' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({hello: 'world'});
  }

  res.writeHead(resData.data || 404, {
    'Content-Type': resData.contentType || 'text/plain'
  });
  res.write(resData.data || 'not found');
  res.end();

});

server.listen(3000, function() {
  console.log('server up');
});
