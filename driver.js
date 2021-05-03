'use strict';

const events = require('./events.js');
require('./vendor.js');

events.on('pickup', orderPickup);

function orderPickup(order) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderId}`);

    events.emit('in-transit', order);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered ${order.orderId}`);

    events.emit('delivered', order);
  }, 3000)
}

module.exports = { orderPickup }