import React from 'react';
import { useState } from 'react';
import Pizza from '../components/Pizza.jsx';
import Modal from '../components/Modal.jsx';

function Home() {
  const pizzaTypes = ['Hawaiian', 'Magherita', 'Sicilian', 'Greek', 'Arabic', 'Chicago']
  const [address, setAddress] = useState(undefined);

  return (
    <div className="main">
      {address === undefined ? <Modal setAddress={setAddress}/> : null}
      <h1>Pizza Place</h1>
      <h2>Choose your Pizza</h2>
      <div className="pizzas">
        {pizzaTypes.map((pizza) => {
          return (
            <Pizza name={pizza} address={address} key={pizza} />
          )
        })}
      </div>
    </div>
  );
}

export default Home;
