const express = require('express');
const route = express.Router();

const RevenueController = require('../app/controller/RevenueController');

route.use('/total', RevenueController.Total);
route.use('/revenue', RevenueController.revenue);
route.use('/customer', RevenueController.customer);
route.use('/food', RevenueController.food);
route.use('/bill', RevenueController.bill);

route.use('/', RevenueController.Synthetic);



module.exports = route;
