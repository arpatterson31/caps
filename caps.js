'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT);

const caps = io.of('/caps');

io.on('connection', socket => {
  console.log('client:', socket.id);

});

caps.on('connection', socket => {
  socket.on('pickup', payload => {
    console.log('EVENT: ', payload);
    socket.broadcast.emit('pickup', payload); // emit to all in the namespace
  });

  socket.on('in-transit', payload => {
    console.log('EVENT: ', payload);
    socket.emit('in-transit', payload); // emit to the vendor
  });

  socket.on('delivered', payload => {
    console.log('EVENT: ', payload);
    socket.broadcast.emit('delivered', payload); // emit to the vendor
  });
});



