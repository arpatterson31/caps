'use strict';

require('dotenv').config();
const IO_PORT = process.env.PORT || 3000;

const io = require('socket.io')(IO_PORT);

const caps = io.of('/caps');

io.on('connection', socket => {
  console.log('client:', socket.id);

});

caps.on('connection', socket => {

  socket.on('join', room => {
    console.log('room name: ', room);

    socket.join(room);
  });

  socket.on('pickup', payload => {
    console.log('EVENT: ', payload);
    caps.emit('pickup', payload); // emit to all in the namespace
  });

  socket.on('in-transit', payload => {
    console.log('EVENT: ', payload);
    caps.emit('in-transit', payload); 
  });

  socket.on('delivered', payload => {
    console.log('EVENT: ', payload);
    caps.to(payload.payload.store).emit('delivered', payload); 
  });
});



