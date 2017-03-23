var EddystoneBeaconScanner = require('eddystone-beacon-scanner');
var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var state = lightState.create();

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var displayResult = function(result) {
    console.log(result);
};

var displayError = function(err) {
    console.error(err);
};

var turnOnLights = function() {

  var api = new HueApi('10.106.144.56', 'kdK77yMrADAVRAjQWixI1aMqn9qw4Y6TAKNgtqSI');
  api.lights()
      .then(displayResults);

  api.setLightState(1, state.on(false)) // provide a value of false to turn off
      .then(displayResult)
      .fail(displayError)
      .done();

  api.setLightState(2, state.on(false)) // provide a value of false to turn off
      .then(displayResult)
      .fail(displayError)
      .done();
};


EddystoneBeaconScanner.on('found', function(beacon) {
  //console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));


  turnOnLights();

});

// EddystoneBeaconScanner.on('updated', function(beacon) {
//   console.log('updated Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
// });

// EddystoneBeaconScanner.on('lost', function(beacon) {
//   console.log('lost Eddystone beacon:\n', JSON.stringify(beacon, null, 2));
// });

EddystoneBeaconScanner.startScanning(true);
