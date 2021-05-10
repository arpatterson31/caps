'use strict';

require('dotenv').config();

const PORT = process.env.QUEUE_SERVER || 8080;
const uuid = require('uuid').v4;
const io = require('socket.io')(PORT);

const queue = {
  'acme-widgets': {},
  '1-206-flowers': {}
}

io.on('connection', socket => {
  console.log('client:', socket.id);

});

const caps = io.of('/caps');

caps.on('connection', socket => {

  socket.on('join', room => {
    console.log('room name: ', room);
    socket.join(room);
  });
  
  socket.on('received', payload => {
    let store = payload.payload.store;
    let orderId = payload.payload.orderId;
    
    delete queue[store][orderId];
  });
  
  socket.on('getAll', payload => {
    Object.keys(queue[payload]).forEach(id => {
      caps.emit('message', { id, payload: queue[payload][id] });
    });
  });

  
  socket.on('delivered', payload => {
    console.log('EVENT: ', payload);
    let store = payload.payload.store;
    let orderId = payload.payload.orderId;
    queue[store][orderId] = { payload };
    caps.emit('delivered', {id, payload });
  })
  
  socket.on('pickup', payload => {
    console.log('EVENT: ', payload);
    let store = payload.payload.store;
    let id = uuid();
    queue[store][id] = payload;
    console.log('current queue', queue);
    caps.emit('pickup', {id, payload}); 
  });
});