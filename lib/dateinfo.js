'use strict';
// a library of sorts, written by Craig Campbell (craig.campbell8@gmail.com)

module.exports = exports = (function(){

    var d = new Date();

    var year =  d.getFullYear().toString();

    var month =  (d.getMonth() + 1).toString(); // add 1 because months go from 0-11 not 1-12
    if ( Number(month) < 10) {
      month = "0" +  month
    }

    var day =  d.getDate().toString();
    if ( Number(day) < 10) {
      day = "0" +  day
    }

    var hours =  d.getHours().toString();
    if ( Number(hours) < 10) {
      hours = "0" +  hours
    }

    var minutes =  d.getMinutes().toString();
    if ( Number(minutes) < 10) {
      minutes = "0" +  minutes
    }

    var seconds =  d.getSeconds().toString();
    if ( Number(seconds) < 10) {
      seconds = "0" +  seconds
    }

    return {
        date: d,

        year :  year,

        month :  month,

        day : day,

        hours : hours,

        minutes : minutes,

        seconds : seconds

        }

})()

