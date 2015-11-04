function route(handle, pathname, response, request) {
  console.log("About to route a request for " + pathname);
  var name;
  var file;

  if (pathname.slice(0, 6) === '/greet' && request.method === 'GET') {
    name = pathname.slice(7, pathname.length);
    handle["/greet"](response, request, name);
  } else if (pathname === '/greet' && request.method === 'POST') {
    request.on('data', function(data) {
      name = JSON.parse(data.toString()).name;
      handle["/greet"](response, request, name);
    });
  } else if (pathname.slice(-4) === '.css' && request.method === 'GET') {
    file = pathname.split('/')[pathname.split('/').length -1];
    console.log(file);
    handle.css(file, response, request);
  } else if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log('No request handler found for ' + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;