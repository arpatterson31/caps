'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');
const storeName = process.env.STORE_NAME;

events.on('start', newOrder);
events.on('delivered', thankYou);

function newOrder() {
  setInterval(() => {
    let order = {
      storeName: storeName,
      orderId: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.streetAddress()}, ${faker.address.city()}`
    }

    let event = {
      event: 'pickup',
      timeStamp: new Date(),
      payload: order
    }

    events.emit('pickup', event);
  }, 5000)
}

function thankYou(order) {
  console.log(order);
  console.log(`VENDOR: Thank you for delivering ${order.payload.orderId}`);
}

module.exports = { newOrder, thankYou };

