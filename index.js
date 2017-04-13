var EddystoneBeaconScanner = require('eddystone-beacon-scanner');
var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var state = lightState.create();
var axios = require('axios');

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};

var turnLights = function(lightsState) {
  var api = new HueApi('10.106.144.56', 'kdK77yMrADAVRAjQWixI1aMqn9qw4Y6TAKNgtqSI');

  console.log(lightsState);

  return api.setLightState(3, state.on(lightsState)) // provide a value of false to turn off
      .then(displayResult)
      .fail(displayError)
      .done();
};


EddystoneBeaconScanner.on('found', function(beacon) {
  // console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));

  console.log('-----------------------------');
  console.log(beacon.url === 'http://tiny.cc/mscgky' ? 'MAD ICE' : 'MAD BLUEBERRY');
  console.log(beacon.url);
  console.log(beacon.distance.toFixed(2));

  if (beacon.distance < 0.5) {
      axios.get(beacon.url)
          .then(function(response) {
                // console.log(response.data);

                return response.data.lights === 'on';
          })
          .then(turnLights);
  }
});

// EddystoneBeaconScanner.on('updated', function(beacon) {
//   console.log('updated Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
// });

EddystoneBeaconScanner.startScanning(true);
