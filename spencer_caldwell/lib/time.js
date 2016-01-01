module.exports = function() {
  var date = Date.now();
  // var hours = date.getHours();
  // var minutes = '0' + date.getMinutes();
  // var seconds = '0' + date.getSeconds();
  // var formattedTime = hours + ':' + minutes.subtr(-2) + ':' + seconds.subtr(-2);
  // formattedTimeString = formattedTime.toString();
  var dateString = date.toString();
  return dateString;
};
