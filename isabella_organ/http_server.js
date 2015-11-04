var http = require('http');
var fs = require('fs');
var url = require('url');
// var time = ;
// var date = ;


var server = http.createServer(function(req, res) {

	var resData = {};

	if (req.url === './public/index.html' && req.method === 'GET') {
		fs.readfile('./public/index.html', function(err, data) {
			if (err) return console.log(err);
		});
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write('./public/index.html').toString();
		response.end();
	}

	if (req.url === '/time' && req.method === 'GET') {
			if (err) return console.log(err);
	}
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.write(time + ' ' + date).toString();
		response.end();
	

	if (req.url === '/greet' && req.method === 'GET') {
			if (err) return console.log(err);
	}
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

	response.write('hello' + ' ' + name).toString();
		response.end();
	

	res.writeHead(resData.status || 404, {
		'Content-Type': resData.contentType || 'text/plain'
	});
	res.Write(resData.data || 'not found');
	res.end();
	});

	server.listen(3000, function() {
		console.log('server up');
});