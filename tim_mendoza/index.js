var server = require(__dirname + '/lib/server');
var router = require(__dirname + '/lib/router');
var requestHandlers = require(__dirname + '/lib/requesthandlers');

var handle = {};
handle["/"] = requestHandlers.start;
handle["/greet"] = requestHandlers.greet;
handle["/time"] = requestHandlers.time;
handle.css = requestHandlers.css;

server.start(router.route, handle);
