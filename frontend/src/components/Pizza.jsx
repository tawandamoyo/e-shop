import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pizza.css';
import hawaiian from '../img/hawaiian.jpg';
import Button from './Button.jsx';

export default function Pizza(props) {
  const navigate = useNavigate();

  function placeOrder() {
    navigate('/order', { state: { pizzaType: props.name } });
  }

  return (
    <div className="pizza-container">
      <img src={hawaiian} alt="" />
      <h5>{props.name}</h5>
      <Button onClick={placeOrder}/>
    </div>
  );
}