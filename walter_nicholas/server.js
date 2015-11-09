var http = require('http');
var fs = require('fs');
var ReadStream = require('stream').Readable;

var server = http.createServer(function(req, res) {
  var resData= {};
  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
    writeRes();
  }

  if (req.url === '/time' && req.method === 'GET') {
    var date = new Date();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    resData.status = 200;
    resData.contentType = 'text/plain';
    resData.data = time;
    writeRes();
  }

  if (req.url.indexOf('/greet/') === 0 && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/plain';
    var name = req.url.substring(7, req.url.length);
    resData.data = 'Hello ' + name + '!';
    writeRes(); 
  }

  if (req.url === '/greet' && req.method === 'POST') {
      resData.status = 200;
      resData.contentType = 'text/plain';
      resData.data = 'post detected';
   
      req.on('data', function(data) {
        var obj = JSON.parse(data);
        resData.data = 'Hello ' + obj.name;
        writeRes();
      });
  }

  function writeRes() {   
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
