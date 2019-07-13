
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`status code ${response.statusCode} when fetching IP ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};

const fetchCoordsByIp =  function(ip, callback) {
  request(`https://ipvigilante.com/${ip}` , function(error, response, body) {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`status code ${response.statusCode} when fetching coords ${body}`), null);
      return;
    }
    const latitude = JSON.parse(body).data.latitude;
    const longitude = JSON.parse(body).data.longitude;
    const coords = {
      'latitude': latitude,
      'longitude': longitude
    };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`status code ${response.statusCode} when fetching times ${body}`), null);
      return;
    }
    const times = JSON.parse(body).response;
    callback(null, times);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("it didn't work!" , error);
      return;
    }
    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        console.log("it didn't work" , error);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          console.log("it didn't work" , error);
          return;
        }
        callback(null, times);
      });
    });
  });

};


module.exports = { nextISSTimesForMyLocation };