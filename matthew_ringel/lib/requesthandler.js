
function greet(request, response) {
  var name = url.parse(request.url).pathname.split('/').pop();
  var body = "Hello " + name.toString();
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(body);
  response.end();
}

function time(request, response) {
  var date = new Date();
  var time = date.toUTCString();
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(time);
  response.end();
}

// var test = function(string) {
//   console.log('logging from ' + string);
// };
//
// test("requesthandler");

exports.greet = greet;
exports.time = time;
