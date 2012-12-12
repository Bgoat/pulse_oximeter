(function() {
  var socket = io.connect('http://localhost:3000');

  socket.on('sensor', function(sensor) {
    $('#heart .value').html(sensor.heartRate);
    $('#oxygen .value').html(sensor.oxygen);
  });
})();
