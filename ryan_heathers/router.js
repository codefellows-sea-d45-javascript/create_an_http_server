var requestHandlers = require('requestHandlers');

function router(route, pathname, response, request) {
  if (pathname.match(/^\/greet\/.*/) && request.method === 'GET') {
    var name = pathname.substring(7);
    requestHandlers.greetName(response, name);
  }
  else if (typeof route[pathname] === 'function' ) {
    route[pathname](response, request);
  }
  else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found");
    response.end();
  }
}

exports.router = router;
