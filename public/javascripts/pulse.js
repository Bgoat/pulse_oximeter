(function() {
  var socket = io.connect('http://192.168.1.40:3000');

  socket.on('sensor', function(sensor) {
    $('#heart .value').html(sensor.heartRate);
    $('#oxygen .value').html(sensor.oxygen);
  });
})();
