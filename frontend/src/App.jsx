import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './views/Home.jsx';
// import Order from './views/Order.jsx';

import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId='816899625586-ntrgjphbcuketrcelh238qchdgna82ij.apps.googleusercontent.com'>
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
