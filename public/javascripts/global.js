// public/javascripts/global.js

$(document).ready(function() {
  getMyIp();
});

//
//
//

function getMyIp() {
  $.getJSON('/ip/json', function (data) {
    $('#myIp').text(data.ip);
  });
};