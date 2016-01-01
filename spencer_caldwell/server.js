var http = require('http');
var fs = require('fs');
var time = require(__dirname + '/lib/time');

var server = http.createServer(function(req, res) {
  var resData = {};
  var reqHeader = req.url;
  var reqHeadStr = reqHeader.slice(7);

  if (req.url === '/' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'});
  res.write(resData.data || 'not found');
    res.end();

  }

  else if (req.url === '/time' && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = time();
    res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'});
  res.write(resData.data || 'not found');
    res.end();
  }

  else if (req.url === '/greet/' + reqHeadStr && req.method === 'GET') {
    resData.status = 200;
    resData.contentType = 'text/html';
    resData.data = 'Hello ' + reqHeadStr + '!';
    res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'});
  res.write(resData.data || 'not found');
    res.end();
  }

//code in question



  else if (req.url === '/greet' && req.method === 'POST') {
    var parse = '';
    req.on('data', function(data) {
      parse = JSON.parse(data);
    });
    req.on('end', function() {
      resData.status = 200;
      resData.contentType = 'text/html';
      console.log(parse.name);
      resData.data = parse.name;
      res.writeHead(resData.status || 404, {
    'Content-Type': resData.contentType || 'text/plain'});
  res.write(resData.data || 'not found');
    res.end();

    });
  }

  else {
res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.write('page not found');
  res.end();
}

//end of code in question


});

server.listen(3000, function() {
  console.log('server up');
})

debugger;
