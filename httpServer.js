var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var server = http.createServer(function(req, res) {

  var resData = {};
  var path = url.parse(req.url).pathname;
  var marker = path.indexOf("/");
  var command = path.slice(marker+1,marker+6);
  var name = path.slice(marker+7);

  if(req.url === '/' && req.method === 'GET'){
    resData.status = 200;
    resData.contentType = {"Content-Type":"text/html"};
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
    res.writeHead(resData.status, resData.contentType);
  }

  if(command === 'greet' && req.method === 'GET'){
    resData.status = 200;
    resData.contentType = {"Content-Type":"text/plain"};
    resData.data = 'hello there, ' + name + '.';
    res.writeHead(resData.status, resData.contentType);
  }

  if(req.url === '/timer' && req.method === 'GET'){
    var date = new Date();
    var time = date.toLocaleTimeString();
    resData.status =200;
    resData.contentType = {"Content-Type":"text/plain"};
    resData.data = 'Time is currently: ' + time;
    res.writeHead(resData.status, resData.contentType);
  }

  if(command === 'greet' && req.method === 'POST'){
    resData.status = 200;
    resData.contentType = 'application/json';
    resData.data = JSON.stringify({'name': name});
    res.writeHead(resData.status, resData.contentType);
  }

  res.write(resData.data || 'not found');
  res.end();
});

server.listen(3030, function(){
  console.log('server running');
});

