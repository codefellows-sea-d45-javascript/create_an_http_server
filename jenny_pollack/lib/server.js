var http = require('http');
var fs = require('fs'); 
var url = require('url'); 


var server = http.createServer(function(request, response){
		var responseData = {}; 

		var pathname = url.parse(request.url).pathname;
		var arr = pathname.split('/');

		console.log('request url: ' + request.url); 

		if(request.url === '/' && request.method === 'GET'){
			responseData.status = 200;
	  	responseData.contentType = 'text/html';
	  	responseData.data = fs.readFileSync(__dirname + '/../public/index.html').toString();

	  	response.writeHead(responseData.status || '404', {
					'Content-Type': responseData.contentType || 'text/plain'
				});
			response.write(responseData.data || 'not found');
			response.end(); 
		}

		if(request.url === '/time' && request.method === 'GET'){
			var date = new Date(); 
			console.log('time: ' + date); 
			responseData.status = 200;
	  	responseData.contentType = 'text/html';
	  	responseData.data = date.toString(); 

			response.writeHead(responseData.status || '404', {
				'Content-Type': responseData.contentType || 'text/plain'
			});

			response.write(responseData.data || 'not found');
			response.end(); 
		}

		if(arr[1] === 'greet' && request.method === 'GET'){
			if(arr.length === 3){
				responseData.status = 200;
	  		responseData.contentType = 'text/html';
	  		responseData.data = 'Greetings, ' + arr[2];

		  	response.writeHead(responseData.status || '404', {
					'Content-Type': responseData.contentType || 'text/plain'
				});

				response.write(responseData.data || 'not found');
				response.end();
			} else{
					responseData.data = 'Hello anon';

		  		response.writeHead(responseData.status || '404', {
					'Content-Type': responseData.contentType || 'text/plain'
				});

				response.write(responseData.data || 'not found');
				response.end();
			} 
		}

		if(arr[1] === 'greet' && request.method === 'POST'){
			console.log('incoming post'); 

			request.on('data', function(chunk) {
				console.log("Received body data:");
	    	console.log(chunk.toString());

	    	responseData.status = 200;
				responseData.contentType = 'application/json';
				responseData.data = chunk.toString();
			});

			request.on('end', function(){ 
				  response.writeHead(responseData.status || '404', {
						'Content-Type': responseData.contentType || 'text/plain'
					});

					response.write(responseData.data || 'not found');
					response.end(); 

	  	});
		}
}); 



server.listen(3000, function(){
	console.log('server running'); 
});


