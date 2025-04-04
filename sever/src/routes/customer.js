const express = require('express');
const route = express.Router();

const CustomerController = require('../app/controller/customerController');

route.use('/',CustomerController.index)

module.exports = route;
