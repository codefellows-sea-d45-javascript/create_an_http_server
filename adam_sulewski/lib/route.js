'use strict';

var fs = require('fs');
var url = require('url');
var handle = require(__dirname + '/handle');

exports = module.exports = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var filename = pathname.split('/')[1];

  if (pathname === '/') filename = 'index';

  fs.readdir(__dirname + '/../public', function(err, files) {
    var routes = files.map(function(file) {
      return file.split('.').shift();
    });

    if (routes.indexOf(filename) === -1) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('not found');
    }

    handle[filename](req, res);
  });
};
