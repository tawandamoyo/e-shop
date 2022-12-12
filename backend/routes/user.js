const knex = require('../pgconfig');
const {Router} = require('express');

const router = Router();

router.post('/user', async (req, res) => {
    await knex('users')
      .insert({
        username: req.body.username, 
        email: req.body.email, 
        role: 'buyer'
      })
      .returning('id')
      .then((id) => {
        return userId = id[0].id;
      });
  
      console.log(userId);
  
      res.send({
        id: userId
      });
    
  });
  
  router.get('/user/:id', async (req, res) => {
    const data = await knex('users')
      .select()
      .where('id', req.params.id);
  
    const user = data[0];
    res.send(user);
  })
  
  router.put('/user', (req, res) => {
    // edit user role
  });
  
  router.delete('/user', () => {
    //
  });

  module.exports = router;
  