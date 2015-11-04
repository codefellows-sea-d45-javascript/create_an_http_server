var http = require('http');
var fs = require('fs');
var url = require('url');
// var time = ;
// var date = ;


var server = http.createServer(function(req, res) {

	var resData = {};

	if (req.url === '/time' && req.method === 'GET') {
		fs.readfile('./public/index.html', fucntion(err, data) {
			if (err) return console.log(err);
		})
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write(time + ' ' + date).toString();
		response.end();
	}

	if (req.url === '/greet' && req.method === 'GET') {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
	}

	res.writeHead(resData.status || 404, {
		'Content-Type': resData.contentType || 'text/plain'
	});
	res.Write(resData.data || 'not found');
	res.end();
});

server.listen(3000, function() {
	console.log('server up');
});