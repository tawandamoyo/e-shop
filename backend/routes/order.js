const knex = require('../pgconfig');
const {Router} = require('express');

const router = Router();


router.post('/order', () => {

});

router.get('/order', (req, res) => {
    console.log(req.cookies);
    res.sendStatus(200);
  
});

router.get('/order-history', () => {
  // requires a customer id
});

router.get('/orders', () => {
  // for sellers, requires seller id
});

router.put('/order', () => {

});

router.delete('/order', () => {
  
});

module.exports = router;