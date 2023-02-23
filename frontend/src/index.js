import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthenticationContextProvider } from './contexts/AuthenticationContextProvider.jsx';
import { CartContextProvider } from './contexts/CartContextProvider.jsx';

import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthenticationContextProvider>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </AuthenticationContextProvider>
);
