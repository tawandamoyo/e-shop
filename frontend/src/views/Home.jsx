import React from 'react';
import { useState } from 'react';
import Pizza from '../components/Pizza.jsx';
import Modal from '../components/Modal.jsx';

function Home() {
  const [address, setAddress] = useState(undefined);

  return (
    <div className="main">
      {address === undefined ? <Modal setAddress={setAddress}/> : null}
      {console.log(address)};
      <h1>Pizza Place</h1>
      <h2>Choose your Pizza</h2>
      <div className="pizzas">
        <Pizza name="Hawaiian" address={address} />
        <Pizza name="Magherita" address={address} />
        <Pizza name="Sicilian" address={address} />
        <Pizza name="Greek" address={address} />
        <Pizza name="Arabic" address={address} />
        <Pizza name="Chicago" address={address} />
      </div>
    </div>
  );
}

export default Home;
