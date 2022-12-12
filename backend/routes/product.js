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

module.exports = router;