"use strict";

function route(handle, pathname, response, request){
  console.log("Routing a request for " + pathname);
  if (typeof handle[pathname] === "function" && request.method === "GET"){
    handle[pathname](response, request);
  } else if (typeof handle[pathname] === "function" && request.method === "POST")
  {
    handle[pathname](response, request);
  }else{
    console.log("No request handlers found for" + pathname +
    ". Sending a 404 to user.");
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found");
    response.end();
  }
}

module.exports.route = route;
