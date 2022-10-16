import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Pizza from '../components/Pizza.jsx';
import './Order.css'
import Button from '../components/Button.jsx';
import Nav from '../components/Nav.jsx';

function Order() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('medium');
  const [base, setBase] = useState('traditional');
  const [toppings, setToppings] = useState([]);
 
  const [toppingsList, setToppingsList] = useState([]);
  let pizzaType = location.state.pizzaType;

  useEffect(()=> {
    (async()=> {
      let data = await axios.get('/toppings');
      console.log(data.data);
      setToppingsList(data.data.map(e => e.name));
    })();
  }, []);

  useEffect(()=> {
    console.log(size, toppings);
  });

  async function handleClick() {

    // set state to loading
    setLoading(true);
    // send request to server
    await axios.post('/order', {
      "size": size,
      "type": pizzaType,
      "toppings": toppings,
      "base": base
    })
    // set set to not loading
    setLoading(false);
  }

  function selectSize (e) {
    setSize(e.target.value);
  };

  function selectBase (e) {
    setBase(e.target.value);
  }


  function toggleToppings(event) {
    let topping = event.target.value;
    if (toppings.includes(topping)) {
      let updatedToppings = toppings.filter((t)=> {
        return t !== topping;
      })
      setToppings(updatedToppings);
    }
    else {
      let updatedToppings = toppings.concat(topping);
      setToppings(updatedToppings);
    }
  };

  return loading ? <div>loading</div> : (
    <>
      {/* <Nav path="/" label="Home"/> */}
      <div className='order-container'>
        <h2>{pizzaType}</h2>
        <p className='pizzaDescription'>{pizzaType} - contains BBQ sauce with BBQ chicken and cheese</p>
        <Pizza/>
        <div className='pizza-size'>
          <h3>Select Pizza size</h3>
          <input type="radio" value="regular" name="size" checked={size === "regular"} onChange={selectSize}/> Regular
          <input type="radio" value="medium" name="size" checked={size === "medium"} onChange={selectSize}/> Medium
          <input type="radio" value="large" name="size" checked={size === "large"} onChange={selectSize}/> Large
        </div>
        <div className='pizza-base'>
          <h3>Select a base</h3>
          <input type='radio' value='pan' name='pizza-base' checked={base === "pan"} onChange={selectBase}/> Pan (Thick)
          <input type='radio' value='traditional' name='pizza-base' checked={base === "traditional"} onChange={selectBase}/> Traditional (Thin)
        </div>
        <div className='pizza-toppings'>
          <h3>Add toppings</h3>
          {toppingsList.map(topping => (
            <>
              <input type='checkbox' value={topping} onClick={toggleToppings} />{topping}
            </>
          ))}
          
        </div>
        <Button onClick={handleClick}/>
      </div>
    </>
  ) ;
}

export default Order;

