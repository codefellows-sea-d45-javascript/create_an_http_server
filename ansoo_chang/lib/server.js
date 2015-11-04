var http = require('http');
var fs = require('fs');
// var ReadStream = require('stream').Readable;

/*
req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response.
*/

var server = http.createServer(function(req, res) {
	var resData = {}
	if (req.url === '/' && req.method === 'GET') {
		resData.status = 200;
		resData.contentType = 'text/html';
		resData.data = fs.readFileSync(__dirname + '/public/index.html').toString();
	}

	// res.writeHead({
	// 	status: resData.status || 400,
	// 	'Content-Type': resData.contentType || 'text/plain'
	// });


});

server.listen(3000, function() {
  console.log('server up!');
});
