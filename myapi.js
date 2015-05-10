/**
 * myapi.js
 * 
 * @version 1.1 - April 2015
 *
 * 
 * DESCRIPTION:
 * an application to demonstrate running a node 
 * API Appserver on a Raspberry Pi to access GPIO I/O
 * Uses the Express and wiringPi node packages. 
 * 
 * 
 * @throws none
 * @see nodejs.org
 * @see express.org
 * 
 * @author Ceeb
 * (C) 2015 PINK PELICAN NZ LTD
 */

var http      = require('http');
var express   = require('express');
var gpio      = require('./gpio');

var app       = express();


// input port objects for our example
var inputs = [    { pin: '4', gpio: '23', value: null },
                  { pin: '6', gpio: '25', value: null }
                ];


  gpio.init();
  console.log('wiring-pi initialised');

// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  var value,
    pin;

  pin = req.params.id;

  // send an object as a JSON string
  console.log('received API request for pin id = ' + pin);

  for( i in inputs ) {
    if ((pin === inputs[i].pin)) {
      console.log('valid Id');
      value = gpio.readInput(Number(pin));
      console.log('value = ' + value);
      inputs[i].value = value.toString();
      res.send(inputs[i]);
      return;
    }
  } // for

  console.log('invalid input Id');
  res.status(403).send('dont recognise that input reference ' + pinString);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
// app.get('/inputs', function (req, res) {
// send an object as a JSON string
//  console.log('all inputs');
//  res.status(200).send(inputs);
// }); // apt.get()

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');

