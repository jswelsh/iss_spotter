const { nextISSTimesForMyLocation } = require('./iss');


const printTimes = function(passOverTimes) {
  for (const pass of passOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next time of pass at ${datetime} for ${duration} seconds.`);
  }
};


nextISSTimesForMyLocation((error, passOverTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printTimes(passOverTimes);
});