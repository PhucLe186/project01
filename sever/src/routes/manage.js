const express = require('express');
const route = express.Router();

const ManageController = require('../app/controller/manageController');


route.use('/', ManageController.index);

module.exports = route;
