const knex = require('../pgconfig');
const {Router} = require('express');

const router = Router();
let cartCookie = false;

router.post('/order', () => {

});

router.get('/order', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  
});

router.get('/cart', async (req, res) => {
  const cart = await knex('orders')
    .select('*')
    .where({order_status: 'cart', user_id: req.user.id})

    console.log('stored cart ', cart);
    res.send(cart)
});

router.get('/order-history', () => {
  // requires a customer id
});

router.get('/orders', () => {
  // for sellers, requires seller id
});

router.put('/order', async (req, res) => {
  let product = {
    title: req.body.product_title,
    id: req.body.product_id,
    price: req.body.price
  }

  let cart = req.cookies.eshopCart;
  if (cart !== undefined) {
    cart = JSON.parse(cart);
  }

  
  
  if (!req.user.id) { // if not logged in, get userId
    if (cart) {
      cart.push(product);
      cartCookie = JSON.stringify(cart)
      res.cookie('eshopCart', cartCookie)
    } else {
      let cart = [];
      cart.push(product);
      cartCookie = JSON.stringify(cart)
      res.cookie('eshopCart', cartCookie)
    }
  } else {
    console.log('someones logged in')
    await knex('orders')
      .insert({
        user_id: req.user.id,
        product_id: product.id,
        quantity: product.quantity,
        order_status: 'cart'
      })
    res.clearCookie('eshopCart');
    console.log('already logged in cart cleared')
  }
  res.sendStatus(200)
})

router.delete('/order', () => {
  
});

module.exports = router;