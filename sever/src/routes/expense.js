const express = require('express');
const route = express.Router();

const ExpenseController = require('../app/controller/ExpenseController');



route.use('/data', ExpenseController.data);
route.use('/', ExpenseController.index);



module.exports = route;
