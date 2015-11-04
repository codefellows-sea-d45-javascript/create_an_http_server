"use strict";

var querystring = require('querystring');
var fs = require('fs');

var postedNames = {name: ["billy", "john"]};

function index(response){
  var resData = {};
  resData.status = 200;
  resData.contentType = "text.html";
  resData.data = fs.readFileSync(__dirname + '/../public/index.html').toString();
  response.write(resData.data);
  console.log("Index written to stream");
  response.end();
  console.log("Index sent to client");
}

function name(response){
  var resData = {};
  resData.status = 200;
  resData.contentType = "application/json";
  resData.data = JSON.stringify(postedNames.name[postedNames.name.length-1]);
  response.write("hello " + resData.data);
  console.log("Name and greeting written to stream");
  response.end();
  console.log("Name and greeting sent to client");

}

function greetPost(response, request){

  var resData = "Thanks for posting your name as" + request.data;

  request.on("data", function(data){
    var reqData = JSON.parse(data.toString());
      if (typeof reqData === "object"){
      postedNames.name.push(reqData.name);
      console.log("Name sent from client and posted to postedNames object")
    }else{
      reqData = "Not a string";
      resData = "You did not POST a string, try again!";
      console.log("Client tried to post a non-string");
    }

    if(reqData === "Not a string"){
      response.write(resData);
      console.log("Error written to response for bad POST from Client");
      response.end();
      console.log("Client sent error for bad POST from client");
    }else{
      console.log("Name written to stream");
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
  resData.contentType = "application/json";
  response.write("The time in hour, minutes, seconds "+ hour + ":" + min + ":" + sec + ". For the miliseconds since 1970, you have " + Date.now());
  console.log("Writing server time");
  response.end();
  console.log("Server time sent to client");
}
module.exports.index = index;
module.exports.name = name;
module.exports.greetPost = greetPost;
module.exports.serverTime = serverTime;
