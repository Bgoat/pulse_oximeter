var serialport = require('serialport')
  , SerialPort = serialport.SerialPort;

var ix = -1;
var sensor = {};
function parseSensor(emitter, buffer) {
  var data = buffer[0];
  
  switch(ix) {
    case 1:
      sensor['waveY'] = data;
      break;
    case 2:
      sensor['waveX'] = data;
      break;
    case 3:
      sensor['heartRate'] = data;
      break;
    case 4:
      sensor['oxygen'] = data;
      break;
  }
  
  if(data > 127) {
    if(ix > -1) {
      emitter.emit('sensor', sensor);
    }
    ix = 0;
  }
  ix++;
};

module.exports = function(io) {
  
  io.sockets.on('connection', function(socket) {
    console.log(socket);

    var sp = new SerialPort('/dev/ttyUSB0', {
      baudrate: 19200,
      buffersize: 1,
      parser: parseSensor
    });
    
    sp.on('sensor', function(sensor) {
      socket.emit('sensor', sensor);
    });

  });

};
