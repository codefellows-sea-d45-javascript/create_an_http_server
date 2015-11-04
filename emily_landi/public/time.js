function GetTime() {
  var date = new Date();
  return {time: date.toString()};
};

module.exports = GetTime;


