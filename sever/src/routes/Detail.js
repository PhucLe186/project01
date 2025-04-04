const express = require('express');
const route = express.Router();

const DetailController = require('../app/controller/detailController');



route.use('/cancel',DetailController.cancelorder)
route.use('/', DetailController.index);


module.exports = route;