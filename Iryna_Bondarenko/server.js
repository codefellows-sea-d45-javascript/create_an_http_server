var http = require('http');
var fs = require('fs');
var url = require('url') ;
var ReadStream = require('stream').Readable;

var server = http.createServer(function(req, res) {
  var resData= {};
  if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = "Local time in Seattle is " + time;
  }
  
  var url = req.url;
  var str_url = url.slice(0,7);
  var name = url.slice(7);
  
  if (str_url === '/greet/' && req.method === 'GET') {
    this.name = name;
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = "Hello " + this.name + "! Have a nice day!"
  }
    if (str_url === '/greet/' && req.method === 'POST') {
      resData.status = 200;
      resData.contentType = 'application/json';
      resData.data = JSON.stringify({hello: name});
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

var date = new Date ();
var time = date.toLocaleTimeString();
