const knex = require('../pgconfig');
const {Router} = require('express');

const router = Router();


router.post('/item', () => {
  
});

router.put('/item', () => {
  // requires product_id
});

router.get('/item/:id', () => {
  
});

router.get('/items', () => {
  
});

router.delete('/item/:id', () => {
  
});

router.post('/addProduct', async (req, res) => {
  console.log(req.body);
  console.log(req.user);

  
  await knex('products')
    .insert({
      product_title: req.body.productTitle,
      product_desc: req.body.productDesc,
      price: req.body.productPrice,
      quantity: req.body.productQuantity,
      image_url: req.body.productImageUrl,
      seller_id: req.user.id
    })
  res.sendStatus(200)
})

module.exports = router;