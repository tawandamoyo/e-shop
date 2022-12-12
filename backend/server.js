const express = require('express');
const knex = require('./pgconfig');
// const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const productRouter = require('./routes/product');

const port = 3000;

const app = express();

app.use(express.static('./backend/static'));
app.use(express.json());
app.use(cookieParser());
app.use(loginRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(productRouter);


// The route below is a wildcard fallback route , may need to be more specific e.g 404 etc
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

module.exports = app;