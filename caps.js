'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const io = reqire('socket.io')(PORT);

const caps = io.of('/caps');

io.on('connection', socket => {
  console.log('client:', socket.id);
});

caps.on('connection', socket => {
  socket.on('pickup', payload => {
    console.log('pickup', payload); // emit to all in the namespace
  });

  socket.on('in-transit', payload => {
    console.log('in-transit', payload); // emit to all in the namespace
  });

  socket.on('delivered', payload => {
    console.log('delivered', payload); // emit to all in the namespace
  });
});



const events = require('./events.js');
require('./vendor.js');
require('./driver.js');

events.emit('start');
