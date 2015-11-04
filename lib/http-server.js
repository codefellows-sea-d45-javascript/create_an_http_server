'use strict';

var EE = require('events').EventEmitter;

var dateinfo = require('./dateinfo.js');
var fs = require('fs');
var http = require('http');
var port = 3000;


var server = http.createServer(function(req, res){
  /* this is shorthand for:
  var server = http.createServer();
  server.on('request', function(req, res){
    so passing in a function to createServer() is the same as passing nothing and then setting an event listener for a request
    */


  var urlName = req.url.slice(7);
  // '/greet/'' is 7 characters long so this gets after the last /

  // need a better method that will not accept sub-directories of name such as /greet/craig/subdirectory  as this would be read as name = /craig/subdirectory'

  var firstLetter = req.url.slice(7, 8); // gets first character after /greet/

  var name = urlName.replace(firstLetter, firstLetter.toUpperCase());

  if (/[/]/.test(name) && name[name.length -1] !== '/') { // if test returns true for "/" in name, then the user is trying to find subdirectories from name, and I want res.statusCode to be 404
    req.url = 'sdjfalsdkjflidasjfladisj';  // a url that will almost certainly be 404
  }

  if (name[name.length -1] === '/') {
    if (name[name.length - 2 ] === '/') {
      req.url = 'sdjfalsdkjflidasjfladisj';
    }
    name = name.slice(0, name.length - 1 );
  }
  // issue:  if url  is something like /greet/craig//d/  (so // then more stuff after that WITH /  - kind of really edgy case here) then it would greet "craig//d/"

  //converts first letter to uppercase
  if (req.url === '/time'){
    res.writeHead(200, {
      'Content-Type' : 'text/plain'
    });

    res.write(
      "The current date is: "  + dateinfo.getTheMonth() + '-' + dateinfo.getTheDay() + '-' + dateinfo.getTheYear() +  ' and the current time is: ' + dateinfo.getTheHours() + ':' + dateinfo.getTheMinutes() + ':' +  dateinfo.getTheSeconds() + '.\n\nThis can also be expressed as '+ Date.now().toString() + ' milliseconds since Janury 1, 1970. \n\nAdditionally, this can be expressed as: ' + dateinfo.newDate()
      );


    return res.end();
  }

  if (req.url === '/greet/' + urlName){
    res.writeHead(200, {
      'Content-Type' : 'text/plain'
    });

    // need to
    res.write("Well hello there, " + name);

    return res.end();
  }


  if (req.method === "POST" && req.url === '/greet'){

    var custom = new EE();

    req.on('data', function(data){
      var parsed = JSON.parse(data.toString());
      custom.emit('blah', parsed); // could just use req or res rather than custom since they are streams and hence event emitters
    });

    custom.on('blah', function(meh) { // hold up the the res.write() and res.end() until the req.on(data) cb is done so that it can be used in res.write();
      console.log(meh);

      res.writeHead(200, {
        'Content-Type' : 'text/plain'
      });

      res.write('Howdy, '  + meh.name + '!');  // JSON string must have a name property or  this will be "Howdy, undefined!"

      return res.end();
    });
  }


  else if (req.url === '/') {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile(__dirname + '/../public/index.html', function(err, data){
        if (err) return console.log(err);
        res.write(data, 'utf-8');
        return res.end(data, 'utf-8');
    });

  }

  // if all of the above don't work, the resource ain't here. So 404 time!

  else { // else block NECESSARY here so that this res.end() doesn't happen while waiing for cb in POST scenario
    res.writeHead(404, {
    'Content-Type' : 'text/plain'
    });
    res.write("You must be trippin! Ain't no such resource here!");
    res.end();
  }

});

server.listen(port, function(){
  console.log("The server is running on port: ", port);
});
