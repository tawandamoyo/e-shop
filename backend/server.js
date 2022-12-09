const express = require('express');
const knex = require('./pgconfig');
// const morgan = require('morgan');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.static('./backend/static'));
app.use(express.json());
// app.use(morgan('tiny'));


// user routes
app.post('/user', async (req, res) => {
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

app.get('/user/:id', async (req, res) => {
  const data = await knex('users')
    .select()
    .where('id', req.params.id);

  const user = data[0];
  res.send(user);
})

app.put('/user', (req, res) => {
  // edit user role
});

app.delete('/user', () => {
  //
});



// product routes
app.post('/item', () => {
  
});

app.put('/item', () => {
  // requires product_id
});

app.get('/item/:id', () => {
  
});

app.get('/items', () => {
  
});

app.delete('/item/:id', () => {
  
});



// order routes
app.post('/order', () => {

});

app.get('/order', () => {
  
});

app.get('/order-history', () => {
  // requires a customer id
});

app.get('/orders', () => {
  // for sellers, requires seller id
});

app.put('/order', () => {

});

app.delete('/order', () => {
  
});

// The route below is a wildcard fallback route , may need to be more specific e.g 404 etc
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

module.exports = app;