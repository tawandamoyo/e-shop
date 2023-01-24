const express = require('express');
const knex = require('./pgconfig');
const secrets = require('./pgconfig');
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');

const port = 3000;

const app = express();

app.use(express.static('./backend/static'));
app.use(express.json());
app.use(cookieParser(secrets.cookieSecret));
app.use(authMiddleware);
app.use(loginRouter);
app.use(logoutRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(productRouter);


// The middleware below describes a catchall handler for any request that does not match any other route, 404??
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});



async function authMiddleware(req, res, next) {
  const email = req.cookies.eshopLogin;
  if(email) {
    const [user] = await knex('users')
    .select()
    .where('email', email)
    .returning('*');
  
  req.user = user;
  } else {
    req.user = {}
  }
  next();
}

module.exports = app;