import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import secrets from '../../secrets.json';
import Home from './views/Home.jsx';
// import Order from './views/Order.jsx';

import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={secrets.googleId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/order" element={<Order />} /> */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
