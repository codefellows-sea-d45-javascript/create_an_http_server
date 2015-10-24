'use strict'

var EE = require('events').EventEmitter;

var dateinfo = require('./dateinfo.js');
//// issue:  the new Date() object is instantiated in the IIFE from dateinfoljs. The object returned captures THAT DATE at THAT TIME and cannot be changed. Thus the date is whatever datetime it was when the server started, not when the page is loaded.

var http = require('http');
var port = 3000;

var server = http.createServer(function(req, res){

  var urlName = req.url.slice(7);
  // '/greet/'' is 7 characters long so this gets after the last /

  // need a better method that will not accept sub-directories of name such as /greet/craig/subdirectory  as this would be read as name = /craig/subdirectory'
  var firstLetter = req.url.slice(7, 8) // gets first character after /greet/

  var name = urlName.replace(firstLetter, firstLetter.toUpperCase())
  //converts first letter to uppercase

  if (req.url === '/time'){
    res.writeHead(200, {
      'Content-Type' : 'text/plain'
    });

    res.write(
      "The current date is: "  + dateinfo.month + '-' + dateinfo.day + '-' + dateinfo.year + ' and the current time is: ' + dateinfo.hours + ':' + dateinfo.minutes + ':' +  dateinfo.seconds + '.\n\nThis can also be expressed as '+ Date.now().toString() + ' milliseconds since Janury 1, 1970. \n\nAdditionally, this can be expressed as: ' + dateinfo.date
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

    var custom = new EE()

    req.on('data', function(data){
      var parsed = JSON.parse(data.toString())
      custom.emit('blah', parsed) // could just use req or res rather than custom since they are streams and hence event emitters
    });

    custom.on('blah', function(meh) { // hold up the the res.write() and res.end() until the req.on(data) cb is done so that it can be used in res.write();
      console.log(meh);

      res.writeHead(200, {
        'Content-Type' : 'text/plain'
      })

      res.write('Howdy, '  + meh.name + '!');  // JSON string must have a name property or  this will be "Howdy, undefined!"

      return res.end();
    });
  }

  // if all of the above don't work, the resource ain't here. So 404 time!

  else { // else block NECESSARY here so that this res.end() doesn't happen while waiing for cb in POST scenario
    res.writeHead(404, {
    'Content-Type' : 'text/plain'
    })
    res.write("You must be trippin! Ain't no such resource here!")
    res.end()
  }

})
.listen(port, function(){
  console.log("The server is running on port: ", port)
})
