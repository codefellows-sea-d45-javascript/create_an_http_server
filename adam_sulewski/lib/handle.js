'use strict';

var fs = require('fs');
var url = require('url');
var formidable = require('formidable');
var form = new formidable.IncomingForm();

var handle = exports = module.exports = (function() {
  return {
    index: function(req, res) {
      fs.readFile(__dirname + '/../public/index.html', function(err, data) {
        if (err) throw err;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    },
    greet: function(req, res) {
      var pathname = url.parse(req.url).pathname;
      var patharray = pathname.split('/');

      if (patharray.length === 3 && patharray[1] === 'greet' &&
        req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello ' + patharray[2] + '!');
      }

      if (pathname === '/greet' && req.method === 'POST') {
        form.parse(req, function(error, fields, files) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Hello ' + fields.name + '!');
        });
      }
    },
    time: function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(new Date().toString());
    }
  };
})();
