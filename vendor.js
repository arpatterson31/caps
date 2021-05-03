'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');

function newOrder() {
  setInterval(() => {
    let order = {
      storeName: process.env.STORE_NAME,
      orderId: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`
    }

    events.emit('pickup', order);
  }, 5000)
}

// function delivered() {

// }

module.exports = { newOrder };

