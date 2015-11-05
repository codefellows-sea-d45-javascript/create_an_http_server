"use strict";
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var fs = require('fs');

require(__dirname + '/../server');








/*
--take a request of any kind (router)
    --route that requst to the appropriate handler
      ---/timeout GET
      ---/greet/name GET
      --/greet POST

--do something with a request of any kind (requestHandler)
    route us to each file type that is returned due to the
    request (including the 404)
    --The server should respond to a request to /time that will send back the
      current time of the server.
    --It should also respond to a get request to /greet/name where name is
    any single word string. It should send back a string that greets that name.
    --It should also have a separate post request to /greet that takes the name in JSON format.

--entry point (index) to ignite process

--have an actual server tht runs (server.js).
    server takes in the request and response

----There should be tests using chaiHTTP for both routes, as well as a gulpfile/package.json

--ou should have an html page that describes the routes implemented by the api available
 at the root of the server (for a bonus point auto populate the routes list, for another bonus point also style the html page)
*/
describe('')
