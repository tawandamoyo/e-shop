const express = require('express');
const client = require('./pgconfig');
const morgan = require('morgan');
const { query } = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static('./backend/static'));

const pizzaTypeToppings = {
  "Hawaiian": ['pineapple', 'tomato', 'cheese', 'ham'],
  "Magherita": ['tomato', 'mozzarella cheese'],
  "Sicilian": ['anchovy', 'tomato', 'cheese'],
  "Greek": ['feta cheese', 'spinach', 'olives', 'green chilli'],
  "Arabic": ['mozzarella cheese', 'green chilli'],
  "Chicago": ['mozzarella cheese', 'bacon', 'mushroom', 'green chilli', 'pineapple', 'olives']
};

app.listen(3000, async () => {
  console.log('App is listening on port' + ' 3000');
  await client.connect();
  console.log('Database is now connecting');
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

  // let allToppings = toppings.concat(pizzaTypeToppings[type]);

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

  // const getToppingPrices = await client.query(
  //   `
  //   SELECT price FROM topping_prices
  //   WHERE size = '${size}' 
  //   AND topping_name 
  //   IN (${
  //         toppings.map(topping => {
  //           return `'${topping}'`;
  //         }).join(', ')
  //       });
  //   `
  // );

  let totalPrice = basePrice + totalToppingsPrice;

  res.send({
    price: totalPrice
  });
 
  // res.send({
  //   price: basePrice + sum(toppingPrices)
  // });
});

app.post('/order', async(req, res) => {
  let pizzaOrder = req.body;
  // 1. INSERT query for order
  let order = await client.query(insertNewOrderQuery());
  let order_id = order.rows[0].id;
  console.log("id is " + order_id);
  console.log(order);
  // 2. INSERT query for pizzas
  let pizza = await client.query(insertNewPizzaQuery(pizzaOrder.size,pizzaOrder.base, order_id, 1));
  let pizzaOrderId = pizza.rows[0].id;

  // 3. INSERT toppings query
  let allToppings = pizzaOrder.toppings.concat(pizzaTypeToppings[pizzaOrder.type]);
  console.log(allToppings);
  let orderToppings = await client.query(insertNewToppingsQuery(pizzaOrderId, allToppings))

  setTimeout(() => {
    res.sendStatus(200);
  }, 2000);
})

function insertNewOrderQuery() {
  return `
    INSERT INTO orders (status, made_in_house)
    VALUES
    
     ('pending', TRUE)

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