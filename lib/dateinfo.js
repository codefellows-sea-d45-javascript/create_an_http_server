'use strict';
// a library of sorts, written by Craig Campbell (craig.campbell8@gmail.com)

module.exports = exports = {

        newDate : function() {

            return new Date().toString();
        },

        getTheYear:  function() {

            return new Date().getFullYear().toString();
        },

        getTheMonth: function(){

            var month =  (new Date().getMonth() + 1).toString(); // add 1 because months go from 0-11 not 1-12
            if ( Number(month) < 10) {
            month = "0" +  month;
            }
            return month.toString();
        },

        getTheDay: function() {

            var day =  new Date().getDate().toString();
            if ( Number(day) < 10) {
                day = "0" +  day;
            }
            return day.toString();
        },

        getTheHours: function() {

            var hours =  new Date().getHours().toString();
            if ( Number(hours) < 10) {
              hours = "0" +  hours;
            }
            return  hours.toString();

        },

        getTheMinutes: function(){

            var minutes =  new Date().getMinutes().toString();
            if ( Number(minutes) < 10) {
              minutes = "0" +  minutes;
            }
            return minutes.toString();
        },

        getTheSeconds: function(){

            var seconds =  new Date().getSeconds().toString();
            if ( Number(seconds) < 10) {
              seconds = "0" +  seconds;
            }
            return seconds.toString();

        }

    };

