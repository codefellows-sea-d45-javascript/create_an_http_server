var http = require('http');
var fs = require('fs');
var routes = require('./lib/routes');

var server = http.createServer(function(req, res) {
  var resData = {};
  var reqUrl = req.url;
  var name;

  if (req.url.lastIndexOf('/') > 0) {
    reqUrl = req.url.slice(0, req.url.lastIndexOf('/'));
    name = req.url.slice(req.url.lastIndexOf('/') + 1);
  }

  if (Object.keys(routes).indexOf(reqUrl) !== -1 && Object.keys(routes[reqUrl]).indexOf(req.method) !== -1) {
    resData = routes[reqUrl][req.method];
    if (name) resData.data = resData.data + name;
  } 
    
  res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType,
  });
  res.write(resData.data || 'not found');
  res.end();
});

server.listen(3000, function() {
  console.log('Server running, yo');
});

