/**
 * MYCLIENT.JS
 * an example web app using an ajax request to our API server which returns a JSON object 
 * 
 * When a user opens index.html it then loads and executes this JavaScript code
 */

window.onload = function () {
  var url,
    i = 0,
    pins = [4, 6];

  for (i = 0; i < 2; i++) {
    $('#input_' + i).html('loading pin ' + pins[i] + '...');
  }

  for (i = 0; i < 2; i++) {
    url = document.URL + '?inputs/' + pins[i];
    console.log('making API call ' + url);

    $.getJSON(url, function (data) {
      console.log('API response received');
      $('#input_' + i).html('GPIO input pin ' + 4 + ' has current value of ' + data.value);
    }); //getJSON
  } // for
}; //onload




