const knex = require('../pgconfig');
const {Router} = require('express');

const router = Router();
// let cartCookie = false;

router.post('/order', () => {

});

router.get('/order', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  
});

router.get('/cart', async (req, res) => {
  const cart = await knex('orders')
    .join('products', 'orders.product_id', '=', 'products.product_id')
    .select('*')
    .where({order_status: 'cart', user_id: req.user.id})

    res.send(cart.map((item) => {
      return {
        title: item.product_title,
        price: item.price,
        id: item.product_id
      }
    }))
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
    await knex('orders')
      .insert({
        user_id: req.user.id,
        product_id: product.id,
        order_status: 'cart'
      })
    res.clearCookie('eshopCart');
  }
  res.sendStatus(200)
})

router.delete('/order', async (req, res) => {
  // is logged in? then delete from cart db
  if (req.user.id) {
    const [item] = await knex('orders')
          .where({'user_id':req.user.id, 'product_id':req.body.id, 'order_status': 'cart'})
          .limit('1')
    
    await knex('orders')
      .delete()
      .where('order_id', item.order_id)        

  } else {
    let {id} = req.body
    let cart = JSON.parse(req.cookies.eshopCart);
    deleteProduct(cart, id);
    cartCookie = JSON.stringify(cart)
    res.cookie('eshopCart', cartCookie);

    function deleteProduct(arr, id) {
      let index;
      for (let i =0; i < arr.length; i++) {
        if (arr[i].id === id) {
          index = i;
          break;
        }
      }
      return arr.splice(index, 1);
    }
  }
  res.sendStatus(200);
});

router.put('/buy', async (req, res) => {
  
  // get cart
  const cart = await knex('orders')
    .select('*')
    .where({order_status: 'cart', user_id: req.user.id});


  const productDetails = cart
  .map((item) => item.product_id)
  .filter((product_id, index, array) => array.indexOf(product_id) === index);

  const productQuantity = productDetails
    .map((itemCount, i) => ({
      product_id: itemCount,
      quantity: cart.filter(item => item.product_id === itemCount).length
    }));

  console.log(productQuantity);

  await knex('orders')
    .where({order_status: 'cart', user_id: req.user.id})
    .update({
      order_status: 'complete'
    });

  for (let i = 0; i < productQuantity.length; i++) {
    product = productQuantity[i];
    await knex('products')
      .where('product_id', '=', product.product_id)
      .decrement('quantity', product.quantity)
  }
  
  res.sendStatus(200);
})

module.exports = router;