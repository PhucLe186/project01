const express = require('express');
const route = express.Router();

const RevenueController = require('../app/controller/RevenueController');


route.use('/', RevenueController.index);


module.exports = route;
