import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pizza.css';
import Button from './Button.jsx';

const images = {
  'Hawaiian': 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2020-03/hawaiian-pizza.jpg?itok=a1-_QjRA',
  'Magherita': 'https://www.acouplecooks.com/wp-content/uploads/2018/10/Margherita-Pizza-018.jpg',
  'Sicilian': 'https://i0.wp.com/blog.slicelife.com/wp-content/uploads/2019/04/Sicilian.jpg?resize=1024%2C538&ssl=1',
  'Greek': 'https://www.healthyseasonalrecipes.com/wp-content/uploads/2019/12/greek-pizza-21-034-1024x1536.jpg',
  'Arabic': 'https://media-cdn.tripadvisor.com/media/photo-s/07/a4/6b/92/manhattan-restaurant.jpg',
  'Chicago': 'https://res.cloudinary.com/hksqkdlah/image/upload/ar_1:1,c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,q_auto:low,w_344/SFS_chicago_deep_dish_pizza-16_cehf9d'
}

export default function Pizza(props) {
  const navigate = useNavigate();

  function placeOrder() {
    navigate('/order', { state: { pizzaType: props.name, address: props.address } });
  }

  return (
    <div className="pizza-container">
      <img className='pizza-image' src={images[props.name]} alt="" />
      <h5>{props.name}</h5>
      <Button onClick={placeOrder}/>
    </div>
  );
}