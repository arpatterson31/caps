'use strict';

require('dotenv').config();
// const events = require('./events.js');
const faker = require('faker');
const storeName = process.env.STORE_NAME;

// const { Socket } = require('socket.io-client');
const io = require('socket.io-client');

const HOST = process.env.HOST;

// const capsConnection = io.connect(HOST);
const capsConnection = io.connect(`${HOST}/caps`);


setInterval(() => {
  let payload = {
    storeName: storeName,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}`
  };
  capsConnection.emit('pickup', { event: 'pickup', time: new Date(), payload: payload })
}, 5000);

capsConnection.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.payload.orderId}`);
});



// events.on('start', newOrder);
// events.on('delivered', thankYou);

// function newOrder() {

//   let event = {
//     event: 'pickup',
//     timeStamp: new Date(),
//     payload: order
//   }

//   events.emit('pickup', event);

// }

// function thankYou(order) {
//   console.log(order);
//   console.log(`VENDOR: Thank you for delivering ${order.payload.orderId}`);
// }

// module.exports = { newOrder, thankYou };

