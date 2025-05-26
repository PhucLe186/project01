const express = require('express');
const route = express.Router();

const ManageController = require('../app/controller/manageController');



route.use("/book", ManageController.book)
route.use('/checked', ManageController.checkout);
route.use('/', ManageController.index);


module.exports = route;
