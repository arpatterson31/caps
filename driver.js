'use strict';

require('dotenv').config();
const io = require('socket.io-client');

const HOST = process.env.HOST;

const capsConnection = io.connect(`${HOST}/caps`);

capsConnection.on('pickup', payload => {
  setTimeout(() => {
    console.log(`Picking up ${payload.payload.orderId}`);

    payload.event = 'in-transit';
    payload.time = new Date();

    capsConnection.emit('in-transit', payload);
  }, 1500);

});

capsConnection.on('in-transit', payload => {
  setTimeout(() => {
    console.log(`delivered ${payload.payload.orderId}`);

    payload.event = 'delivered';
    payload.time = new Date();

    capsConnection.emit('delivered', payload);
  }, 3000);

});
