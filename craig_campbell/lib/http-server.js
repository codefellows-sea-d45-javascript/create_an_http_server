'use strict';

var dateinfo = require('./dateinfo.js');
var fs = require('fs');
var http = require('http');
var port = 3000;

var server = http.createServer(function(req, res){
  var name = req.url.slice(7);

 if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/../public/index.html', function(err, data){
       res.writeHead(200, {'Content-Type' : 'text/html'});
        if (err) return console.log(err);
        res.write(data, 'utf-8');
        return res.end();
    });
  }

  if (req.method === "GET" && req.url === '/time'){
    res.writeHead(200, {
      'Content-Type' : 'text/plain'
    });

    res.write(
      "The current date is: "  + dateinfo.getTheMonth() + '-' + dateinfo.getTheDay() + '-' + dateinfo.getTheYear() +  ' and the current time is: ' + dateinfo.getTheHours() + ':' + dateinfo.getTheMinutes() + ':' +  dateinfo.getTheSeconds() + '.\n\nThis can also be expressed as '+ Date.now().toString() + ' milliseconds since Janury 1, 1970. \n\nAdditionally, this can be expressed as: ' + dateinfo.newDate()
      );
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/greet/' + name){
    res.writeHead(200, {
      'Content-Type' : 'text/plain'
    });
    res.write("Well hello there, " + name);
    return res.end();
  }

  if (req.method === "POST" && req.url === ('/greet')){

    req.on('data', function(data){
      var parsed = JSON.parse(data.toString());
      console.log(parsed);
      res.writeHead(200, { 'Content-Type' : 'text/plain'});
      res.write('Howdy, '  + parsed.name + '!');
      return res.end();
    });
  }

  if ((req.method === 'GET' && req.url !== '/' && req.url !== '/greet/' + name && req.url !== '/time'  ) || (req.method === 'POST' && req.url !== '/greet') ){
    res.writeHead(404, {
    'Content-Type' : 'text/plain'
    });
    res.write("You must be trippin! Ain't no such resource here!");
    res.end();
  }

}); //end createServer

server.listen(port, function(){
  console.log("The server is running on port: ", port);
});
