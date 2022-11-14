import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './views/Home.jsx';
// import Order from './views/Order.jsx';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/order" element={<Order />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
