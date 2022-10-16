import React from 'react';
import Pizza from '../components/Pizza.jsx';

function Home() {
  return (
    <div className="main">
      <h1>Pizza Place</h1>
      <h2>Choose your Pizza</h2>
      <div className="pizzas">
        <Pizza name="Hawaiian" />
        <Pizza name="Magherita" />
        <Pizza name="Sicilian" />
        <Pizza name="Greek" />
        <Pizza name="Arabic" />
        <Pizza name="Chicago" />
      </div>
    </div>
  );
}

export default Home;
