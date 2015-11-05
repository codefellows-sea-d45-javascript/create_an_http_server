Write an http server that responds to several different routes.

SERVER
√ respond to a request to '/time' that will send back the current time of the server.
-respond to a request to '/greet/name' where name is any single word string and send back a string that greets that name.
-have a separate post request to /greet that takes the name in JSON format.

TESTS
-using chaiHTTP for both routes
√ gulpfile/package.json

HTML
√ have an html page that describes the routes implemented by the api available at the root of the server
-for a bonus point auto populate the routes list
√ for another bonus point also style the html page

RUBRIC
Tests: 4pts
Routes: 4pts
Organization and gulpfile/package.json 2pts
