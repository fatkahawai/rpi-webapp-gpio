var wpi = require('wiring-pi');
// var ref = require('ref');   // required if passing pointers to lib functions
// var ffi = require('ffi');


// var gert = ffi.Library('libwiringPiDev', {
//  'gertboardAnalogSetup': [ 'int', [ 'int' ] ]
// });

// var res = gert.atod();
// console.log('Gertboard ADC is currently measuring: ' + res);

wpi.setup('wpi');

var port = 0;
var gertPinBase = 0;
// gert.gertboardAnalogSetup(gertPinBase);

if (wpi.gertboardSPISetup() < 0){
  console.log("error " + errno);
  exit;
}

var value;

console.log("RPi board rev = " + wpi.piBoardRev());
console.log("RPi board Id = " + wpi.piBoardId());

console.log("wiringPi ADC port " + port);

setInterval(function() {
  value = wpi.analogRead(port);
  console.log("analog input = " + value);
}, 500);
