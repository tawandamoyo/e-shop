const express = require('express');
const client = require('./pgconfig');
const morgan = require('morgan');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.static('./backend/static'));
app.use(express.json());
app.use(morgan('tiny'));

const pizzaTypeToppings = {
  "Hawaiian": ['pineapple', 'tomato', 'cheese', 'ham'],
  "Magherita": ['tomato', 'mozzarella cheese'],
  "Sicilian": ['anchovy', 'tomato', 'cheese'],
  "Greek": ['feta cheese', 'spinach', 'olives', 'green chilli'],
  "Arabic": ['mozzarella cheese', 'green chilli'],
  "Chicago": ['mozzarella cheese', 'bacon', 'mushroom', 'green chilli', 'pineapple', 'olives']
};

app.listen(port, async () => {
  console.log(`
    App is listening on port http://localhost:${port}; \n 
    Now connecting to Database \n
    Press Ctrl-C to terminate
  `);
  await client.connect();
});

app.get('/toppings', async(req, res) => {
  let toppings = await client.query('select * from toppings;');
  res.send(toppings.rows);
});

app.put('/price', async (req, res) => {
  const {
    type,
    size,
    toppings,
  } = req.body;

  console.log(req.body);

  const getBasePrice = await client.query(
    `SELECT price FROM pizza_prices WHERE size = '${size}';`
  );

  const basePrice = getBasePrice.rows[0].price;
  let totalToppingsPrice;

  if (toppings.length > 0) {
    const getToppingPrices = await client.query(
      `
      SELECT price FROM topping_prices
      WHERE size = '${size}' 
      AND topping_name 
      IN (${
            toppings.map(topping => {
              return `'${topping}'`;
            }).join(', ')
          });
      `
    );

    let toppingPrices = getToppingPrices.rows;
    totalToppingsPrice = sumToppingsPrice(toppingPrices, 'price');

    function sumToppingsPrice(toppingPrices, prop) {
      return toppingPrices.reduce((a, b) => {
        return a + b[prop];
      }, 0)
    }
  } else {
    totalToppingsPrice = 0;
  }

  let totalPrice = basePrice + totalToppingsPrice;

  res.send({
    price: totalPrice
  });

});

app.post('/order', async(req, res) => {
  let pizzaOrder = req.body;
  console.log(pizzaOrder);
  const deliveryAddress = pizzaOrder.deliveryAddress;

  // 1. INSERT query for order
  let order = await client.query(insertNewOrderQuery(deliveryAddress));
  let order_id = order.rows[0].id;

  // 2. INSERT query for pizzas
  let pizza = await client.query(insertNewPizzaQuery(pizzaOrder.size,pizzaOrder.base, order_id, 1));
  let pizzaOrderId = pizza.rows[0].id;

  // 3. INSERT toppings query
  let allToppings = pizzaOrder.toppings.concat(pizzaTypeToppings[pizzaOrder.type]);
  await client.query(insertNewToppingsQuery(pizzaOrderId, allToppings))

  setTimeout(() => {
    res.sendStatus(200);
  }, 2000);
});

function insertNewOrderQuery(address) {
  return `
    INSERT INTO orders (status, delivery_address)
    VALUES
    
     ('pending', '${address}')

     RETURNING id;
  `
};

function insertNewPizzaQuery(size, base, order_id, quantity) {
  return `
    INSERT INTO pizzas (size, base, order_id, quantity)
    VALUES 

      ('${size}', '${base}', ${order_id}, ${quantity})
      
      RETURNING id;
  `
}

function insertNewToppingsQuery(pizzaOrderId, toppings) {

  let toppingsCount = {};
  for (let topping of toppings) {
    if (toppingsCount[topping]) {
      toppingsCount[topping] += 1;
    } else {
      toppingsCount[topping] = 1;
    }
  };
  
  return `
    INSERT INTO pizza_toppings (pizza_id, topping_name, topping_quantity)
    VALUES

    ${Object.keys(toppingsCount).map(topping => {
      return `(${pizzaOrderId}, '${topping}', ${toppingsCount[topping]})`
    }).join(', \n\t')}
    ;
  `
};

function sum(arr) {
  return arr.reduce((a, b) => { return a + b }, 0)
}

process.on('exit', () => {
  client.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});