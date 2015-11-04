var http = require('http');
var fs = require('fs');
var url = require('url');
// var ReadStream = require('stream').Readable;

/*
req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response.
*/

var server = http.createServer(function(req, res) {
  // create response data object
	var resData = {}
	var name = req.url.split('/')[2];
	var queryObj = url.parse(req.url, true)
  console.log(name)

	if (req.url === '/' && req.method === 'GET') {
		resData.status = 200;
		resData.contentType = 'text/html';
		resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
	}

	if (req.url === '/time' && req.method === 'GET') {
	  resData.status = 200;
	  resData.contentType = 'text/html';
	  resData.data = new Date().toString();
	  // resData.data = writeTime(req)
  }

  if (req.url === '/greet/' + name && req.method === 'GET') {
    // console.log(name);
    resData.status = 200;
	  resData.contentType = 'text/html';
	  resData.data = 'Hello ' + name;
  }

	res.writeHead(resData.status || 400, {
		'Content-Type': resData.contentType || 'text/plain'
	});

  res.write(resData.data || 'not found');
	res.end();
});

server.listen(3000, function() {
  console.log('server up!');
});


// function writeTime(request) {
//   var resData = {}
// 		resData.status = 200;
// 		resData.contentType = 'text/html';
// 		resData.data = new Date().toString();
// 	}
// 	return resData;
// }
