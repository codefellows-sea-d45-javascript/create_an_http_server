'use strict';

var fs = require('fs');
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
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('greet/ not yet defined');
    },
    time: function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(new Date().toString());
    }
  };
})();

