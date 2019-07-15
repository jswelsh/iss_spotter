
const { nextISSTimesForMyLocation } = require('./iss_promised');

const printTimes = function(passOverTimes) {
  for (const pass of passOverTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next time of pass at ${datetime} for ${duration} seconds.`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });