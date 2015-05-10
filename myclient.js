/**
 * MYCLIENT.JS
 * an example web app using an ajax request to our API server which returns a JSON object 
 * 
 * When a user opens index.html it then loads and executes this JavaScript code
 */

window.onload = function () {
  var url,
    i,
    pins = [4, 6];

  for (i in pins) {
    $('#input_' + pins[i]).html('loading pin ' + pins[i] + ' value...');
  }

  for (i in pins) {
    url = document.URL + 'inputs/' + pins[i];
    console.log('making API call ' + url);

    $.getJSON(url, function (data) {
      console.log('API response received. pin = ' + data.pin + ', value = ' + data.value);
      $('#input_' + data.pin).html('GPIO input pin ' + data.pin + ' has current value of ' + data.value);
    }); //getJSON
  } // for
}; //onload




