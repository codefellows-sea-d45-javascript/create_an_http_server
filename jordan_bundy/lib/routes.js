var fs = require('fs');

var routes = {};
var routeList = '';

routes['/'] = {
  GET: {
    status: 200,
    contentType: 'text/html',
    data: fs.readFileSync(__dirname + '/../public/index.html').toString()
  }
};

routes['/name'] = {
  GET: {
    status: 200,
    contentType: 'text/plain',
    data: 'Hello there Mr. '
  },
  POST: {
    
  }
};

routes['/time'] = {
  GET: {
    status: 200,
    contentType: 'text/plain',
    data: new Date().toString()
  }
};

Object.keys(routes).forEach(function(route) {
  routeList += '<a href="' + route + '">' + route + '</a><br>';
});

fs.writeFileSync(__dirname + '/../public/index.html', '<!doctype html>'+
  '<html>'+
  '<head>'+
  '</head>'+
  '<body>'+
    '<h1>Hello World</h1>'+
    routeList +
  '</body>'+
  '</html>'
  );

module.exports = routes;

