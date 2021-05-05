'use strict';

require('dotenv').config();
const express = require('express');
const faker = require('faker');
const cors = require('cors');

const io = require('socket.io-client');
const HOST = process.env.HOST || 'http://localhost:3000';
const socket = io.connect(`${HOST}/caps`);

const store = 'My Awesome Store';

const app = express();
const API_PORT = process.env.API_PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('pickup', (req, res) => {
  let payload = req.body || {
    store: store,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}`
  };
  socket.emit('pickup', { event: 'pickup', time: new Date(), payload: payload });
  res.status(200).send('Package has been scheduled for pickup');
});

app.listen(API_PORT, () => {
  console.log(`Gurrl we up on ${API_PORT}`);
});