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

// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  // send an object as a JSON string
  console.log('received API request for pin id = ' + req.params.id);

  if ((req.params.id === inputs[0].pin) || (req.params.id === inputs[1].pin)) {
    inputs[req.params.id].value = gpio.readInput(req.params.id);
    res.send(inputs[req.params.id]);
  } else {
    res.send('dont recognise that input reference ' + req.params.id);
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

