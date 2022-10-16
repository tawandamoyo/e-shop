let toppings = ['calamari', 'cheese', 'feta', 'tomato', 'apple'];

let orderId = 3;
let expression = `(3, 'calamari', 5)`;

function insertNewToppingsQuery(pizzaOrderId, toppings) {

    return `
      INSERT INTO pizza_toppings (pizza_id, topping_name, topping_quantity)
      VALUES

      ${toppings.map(topping => {
        return `(${pizzaOrderId}, '${topping}', 4)`
      }).join(', \n\t')}
      ;
    `
  };

  toppings = toppings.concat('anchovy', 'olives', 'tomato', 'cheese');
  
  let count = {};

  for (let topping of toppings) {
    if (count[topping]) {
      count[topping] += 1
    } else {
      count[topping] = 1
    }
  };

  console.log('the count: ' + count['cheese'])




//   let query = insertNewToppingsQuery(orderId, toppings);
//   console.log(query);