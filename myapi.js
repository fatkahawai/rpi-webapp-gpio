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


// dummy input port values for our example
// var inputs = [    { pin: '11', gpio: '17', value: 1 },
//                  { pin: '12', gpio: '18', value: 0 }
//                ];

var pin1 = 4; // GPIO chip pin 4 = Header pin GPIO23
var pin2 = 6; // = Header pin 25


gpio.init();

// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  if (req.params.id === pin1) {
    res.send(gpio.readInput(pin1));
  } else if (req.params.id === pin2) {
    res.send(gpio.readInput(pin2));
  } else {
    res.send('dont recognise that pin number ' + req.params.id);
  }
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

