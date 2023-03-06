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
  
  router.get('/user', async (req, res) => {
    const [{role}] = await knex('users')
      .select('role')
      .where('id', req.user.id);
  
    res.send(role);
  })
  
  router.put('/user', async(req, res) => {
    await knex('users')
      .where('id', req.user.id)
      .update('role', 'seller')

    console.log('upgrade successful')
    res.sendStatus(200)
  });
  
  router.delete('/user', () => {
    //
  });

  module.exports = router;
  