var http = require('http');
var fs = require('fs');
var ReadStream = require('stream').Readable;


var server = http.createServer(function(req, res) {
  var resData = {};

  var date = new Date();
  var time = date.toLocaleTimeString();

  if (req.url === '/index' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/../public/index.html').toString();
  }

  if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = "The current time in Seattle is : " + time;
  }

  var str = req.url; // '/greet/tina'
  var str_url = str.slice(0,7);
  var name = str.slice(7);

  if (str_url === '/greet/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = "Hello there, " + name;
  }

  if (str_url === '/greet/' && req.method === 'POST') {
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({name: name});
  }

  var status = 0;
  if (!resData.status) {
    status = 404;
  }

  else
  {
    status = resData.status;
  }

  res.writeHead(status, {
    'Content-Type': resData.contentType || 'text/plain'
  });

  res.write(resData.data || 'not found');
  res.end();

});

server.listen(3000, function() {
  console.log('server up');
});


module.exports = server;
