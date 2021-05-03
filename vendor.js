'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');

events.on('new-order', newOrder);

function newOrder() {
  setInterval(() => {
    let order = {
      storeName: process.env.STORE_NAME,
      orderId: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.streetAddress()}, ${faker.address.city()}`
    }

    events.emit('pickup', order);
  }, 5000)
}

events.on('delivered', thankYou);
function thankYou(order) {
 console.log(`VENDOR: Thank you for delivering ${order.orderId}`);
}

module.exports = { newOrder };

