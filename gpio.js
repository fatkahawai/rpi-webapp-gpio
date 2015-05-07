/**
 * gpio.js
 * 
 * @version 1.0
 * 
 * DESCRIPTION: utility module for accessing GPIO in/outputs
 * 
 * @throws none
 * @see 
 * 
 * @author Bob Drummond
 * (C) 2015 PINK PELICAN NZ LTD
 */
var wpi = require('wiring-pi');

var gpio = {},
  value = null,
  debugMode = true;

gpio.init = function () {
  wpi.setup('wpi');
};

/*
 * @arg pin = pin # on the GPIO chip. E.g.: pin 4 = RPi Header pin 23, pin 6 = Header 25
 */
gpio.readInput = function (pin) {

  wpi.pinMode(pin, wpi.INPUT);

  value = wpi.digitalRead(pin);

  if (debugMode) {
    console.log("gpio.readInput result is " + value);
  }
  return value;
};

gpio.blink = function (pin) {
  var value = 1;

  wpi.pinMode(pin, wpi.OUTPUT);

  setInterval(function () {
    wpi.digitalWrite(pin, value);
    value = !value;
  }, 500);
};

module.exports = gpio;