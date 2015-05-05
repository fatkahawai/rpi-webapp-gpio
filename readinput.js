var wpi = require('wiring-pi');

wpi.setup('wpi');

var pin = 4; // GPIO chip pin 4 = Header pin GPIO23

wpi.pinMode(pin, wpi.INPUT);

var value;

value = wpi.digitalRead(pin);

console.log("input is " + value);

