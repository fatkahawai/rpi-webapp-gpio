
README.MD

rpi-webapp-gpio

A web API for the Raspberry Pi implemented using Node.JS, to access the GPIO ports and allow monitoring and control of I/O from a web client.

The RPi-side server app uses Node & Express to provide a RESTful API responding to an ajax request, and returns a JSON object which can be directly referenced in the client.
it uses the pi-gpio node module to access the GPIO ports. 

myapi.js is the Node.JS application. its an http server which serves html and js files, and also responds to API requests to read GPIO inputs. It can easily be extended to write to GPIO outputs.

to start, download the source files into a new directory on the RPi, 
install the node modules required 
npm install express
npm install pi-gpio

and finally, run the application by starting node with the myapi.js file as argument.
(you must run this with root priviledges to be able to access the GPIO)
  $ sudo node myapi.js

this starts the http server on localthost using port 3000

If you now open a browser on your PC or Mac and browse to http://[your RPi's IP Address]:3000, the index.html file will be loaded from the RPi and displayed (served by myapi.js acting as a webserver). 
index.html immediately loads the myclient.js file from the RPi, which contains the client-side logic, next sending an API query to our server-side API running on the RPi. The server api reaponds with the current value of the required input pin.


