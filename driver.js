'use strict';

require('dotenv').config();
const events = require('./events.js');
require('./vendor.js');

const { Socket } = require('socket.io-client');
const io = require('socket.io-client');

const HOST = process.env.HOST;

// const capsConnection = io.connect(HOST);
const capsConnection = io.connect(`${HOST}/caps`);

events.on('pickup', orderPickup);
events.on('in-transit', inTransit);

function orderPickup(order) {
  setTimeout(() => {
    console.log(order);
    console.log(`DRIVER: picked up ${order.payload.orderId}`);

    order.event = 'in-transit';

    events.emit('in-transit', order);
  }, 1000);

}

function inTransit(order) {
  setTimeout(() => {
    console.log(order)
    console.log(`DRIVER: delivered ${order.payload.orderId}`);

    order.event = 'delivered';

    events.emit('delivered', order);
  }, 3000)
}

module.exports = { orderPickup }