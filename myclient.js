/**
 * MYCLIENT.JS
 * an example web app using an ajax request to our API server which returns a JSON object 
 * 
 * When a user opens index.html it then loads and executes this JavaScript code, which reads 
 * the current logic level on the input ports, and displays that in the window, each in a div 
 * identified by the index "inputs_[port number]"
 */

window.onload = function () {
  var url,
    i,
    ports = [23, 25];  // the GPIO ports we will read

  for (i in ports) {
    $('#input_' + ports[i]).html('loading port ' + ports[i] + ' value...');
  }

  setInterval( function () {
    for (i in ports) {
      url = document.URL + 'inputs/' + ports[i];
      console.log('making API call ' + url);

      $.getJSON(url, function (data) {
        console.log('API response received. port ' + data.gpio + ' value = ' + data.value);
        $('#input_' + data.gpio).html('GPIO input port ' + data.gpio + ' value is ' + data.value);
      });
    } // for 
  }, 1000); // setInterval
  
}; //onload




