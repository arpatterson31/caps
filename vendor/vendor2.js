'use strict';

require('dotenv').config();

const faker = require('faker');
const store = '1-206-flowers';

const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';

const capsConnection = io.connect(`${HOST}/caps`);

capsConnection.emit('join', store);
capsConnection.emit('getAll', store);

capsConnection.on('message', message => {
  console.log('messages: ', message.payload.payload);
  capsConnection.emit('received', message.payload.payload);
});


setInterval(() => {
  let payload = {
    store: store,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}`
  };
  capsConnection.emit('pickup', { event: 'pickup', time: new Date(), payload: payload })
}, 5000);


capsConnection.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.payload.orderId}`);
});
