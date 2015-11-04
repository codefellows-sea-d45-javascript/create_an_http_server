var http = require('http');
var url = require('url');
var fs = require('fs');


var server = http.createServer(function(request, response) {
var pathArray = request.url.split('/');


if (request.url === '/' && request.method === 'GET' ){
  fs.readFile('./public/index.html', function(err, data) {
    if (err) throw err;
    response.writeHead(200, {"Content-Type": "text/html"});
    var htmlString = data.toString().replace("{{Name}}", "");
    response.write(htmlString);
    response.end();
  });
}
if (pathArray[1] === 'greet' && request.method === 'GET') {
  console.log(pathArray);
  fs.readFile('./public/index.html', function(err, data) {
    if (err) throw err;
    console.log('greet!');
    //Need an if statement
    response.writeHead(200, {"Content-Type": "text/html"});
    var htmlString = data.toString().replace("{{Name}}", " " + pathArray[2]);
    response.write(htmlString);
    response.end();
  });
}

});

server.listen(3000, function(){
  console.log('server is up!');
});

