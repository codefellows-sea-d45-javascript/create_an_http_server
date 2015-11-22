var http = require('http');
var fs = require('fs');
var ReadStream = require('stream');
var url = require('url');
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser').json;

app.use(bodyParser());

app.get('/time', function(req, res) {
  var date = new Date();
  res.send(date.toDateString());
  res.end();
});

app.get('/greet/:name', function (req, res) {
  res.send('yo whats up ' + req.params.name);
  res.end();
});

app.post('/greet', function (req, res) {

  res.send('yo whats up ' + req.body.name);
  res.end();
});

app.listen(3000, function() {
  console.log('server is ready');
});
