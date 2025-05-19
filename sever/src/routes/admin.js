const express = require('express');
const route = express.Router();

const adminController = require('../app/controller/AdminController');


route.use('/login', adminController.loginadmin)
route.use('/check', adminController.checklogin);
route.use('/logout', adminController.logout);

module.exports = route;
