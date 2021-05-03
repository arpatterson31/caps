'use strict';

const events = require('./events.js');
require('./vendor.js');

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