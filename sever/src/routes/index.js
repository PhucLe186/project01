const Menu = require('./menu');
const Auth = require('./auth');
const Cart= require('./cart');
const Book= require('./book')
const Voucher= require('./voucher')
const Detail= require('./Detail')
const table = require('./table')
const manage = require('./manage')
const Bill= require('./bill');
const admin= require('./admin')
const customer=require('./customer')

function route(app) {
  app.use('/menu', Menu);
  app.use('/auth', Auth);
  app.use('/cart', Cart);
  app.use('/book', Book);
  app.use('/voucher', Voucher);
  app.use('/detail', Detail);
  app.use('/tables', table);
  app.use('/manage', manage);
  app.use('/api/bills', Bill);
  app.use('/customer', customer)
  app.use('/admin', admin)


}

module.exports = route;
