var wpi = require('wiring-pi');

wpi.setup('wpi');

var pin = 6; // GPIO chip pin 6 = Header pin GPIO25

wpi.pinMode(pin, wpi.OUTPUT);

var value = 1;

setInterval(function() {
  wpi.digitalWrite(pin, value);
  value = +!value;
}, 500);
