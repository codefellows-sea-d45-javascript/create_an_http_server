"use strict";


var querystring = require('querystring');
var fs = require('fs');

var postedNames = {name: ["billy", "john", "ev"]};

function index(response){
  var resData = {};
  resData.status = 200;
  resData.data = fs.readFileSync(__dirname + '/../public/index.html').toString();
  response.setHeader("Content-Type", "text/html");
  response.write(resData.data);
  console.log("Index written to stream");
  response.end();
  console.log("Index sent to client");
}

function name(response){
  var resData = {};
  resData.status = 200;
  response.setHeader("Content-Type", "text/plain");
  resData.data = JSON.stringify(postedNames.name[postedNames.name.length-1]);
  response.write("hello " + resData.data);
  console.log("Name and greeting written to stream");
  response.end();
  console.log("Name and greeting sent to client");

}

function greetPost(response, request){

  var message;

  request.on("data", function(data){
    var reqData = JSON.parse(data.toString());
      if (typeof reqData === "object"){
      postedNames.name.push(reqData.name);
      console.log("Name sent from client and posted to postedNames object")
    }else{
      message = "Not a string";
      console.log("Client tried to post a non-string");
    }

    if(message === "Not a string"){
      console.log("Error written to response for bad POST from Client");
      response.setHeader("Content-Type", "text/plain");
      message.status(405);
      response.write(message);
      response.end();
      console.log("Client sent error for bad POST from client");
    }else{
      console.log("Name written to stream");
      response.setHeader("Content-Type", "text/plain");
      message = "You have posted your name";
      response.write(message);
      response.end();
      console.log("Name sent to client");
    }

  });
}

function serverTime(response){
  var resData = {};

  var time = new Date();
  var day= time.getDate();
  var month = time.getMonth();
  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();

  resData.status = 200;
  response.setHeader("Content-Type", "text/plain");
  response.write("The time in hour, minutes, seconds "+ hour + ":" + min + ":" + sec + ". For the miliseconds since 1970, you have " + Date.now());
  console.log("Writing server time");
  response.end();
  console.log("Server time sent to client");
}
module.exports.index = index;
module.exports.name = name;
module.exports.greetPost = greetPost;
module.exports.serverTime = serverTime;
