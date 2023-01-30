import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import secrets from '../../secrets.json';
import Home from './views/Home.jsx';
import Products from './views/Products';
import NotFound404 from './views/NotFound404';
import NavBar from './components/NavBar';

import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={secrets.googleId}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound404 />} />

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
