To complete this assignment:
  * fork this repository (the sub module for this specific assignment)
  * clone down your fork
  * place all of your work in a folder that is your full name, use `_`s instead of spaces
  * push back up to your fork
  * create a pull request back to the original repo
  * submit a link to the PR in canvas

Assingment Description
---------------------------
For this assignment you should write an http server in vanilla node that responds to several different routes.
The server should respond to a request to /time that will send back the current time of the server.

  * It should also respond to a get request to /greet/name where name is any single word string.
  * It should send back a string that greets that name.
  * It should also have a separate post request to /greet that takes the name in JSON format.
  * There should be tests using chaiHTTP for both routes, as well as a gulpfile/package.json
  * You should have an html page that describes the routes implemented by the api available at the root of the server


Rubric:
  * Tests: 4pts
  * Routes: 4pts
  * Organization and gulpfile/package.json 2pts

