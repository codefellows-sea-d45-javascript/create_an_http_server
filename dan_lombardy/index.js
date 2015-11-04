"use strict";

var server = require(__dirname + "/lib/server");
var router = require(__dirname + "/lib/router");
var requestHandlers = require(__dirname + "/lib/requestHandlers");

var handle = {};
var hande = {};
handle["/"] = requestHandlers.index;
handle["/index"] = requestHandlers.index;
handle["/server"] = requestHandlers.serverTime;
handle["/greet"] = requestHandlers.greetPost;
handle["/greet/name"] = requestHandlers.name;

server.start(router.route, handle);
