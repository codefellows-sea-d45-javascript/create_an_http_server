var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {

});

server.listen(3000, function() {
  console.log('server up');
})
