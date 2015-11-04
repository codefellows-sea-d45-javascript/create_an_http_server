var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res, err) {

	var resData = {};

	if (req.url === '/public/index.html' && req.method === 'GET') {
		fs.readfile('./public/index.html', function(err, data) {
			if (err) return console.log(err);
		});
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.write('./public/index.html').toString();
		res.end();
	} else {

		if (req.url === '/time' && req.method === 'GET') {
			if (err) return console.log(err);
		
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			resData.data = 'Time is ' + new Date().toString();
		}
		

		if (req.url === '/greet' && req.method === 'GET') {
				if (err) return console.log(err);
		
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			resData.data = 'hello';
		}
		

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
