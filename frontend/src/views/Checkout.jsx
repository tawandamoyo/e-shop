import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContextProvider';
import Button from '../components/Button';
import CartContents from './CartContents';

export default function Checkout() {
    const {checkout} = useContext(CartContext);

    return (
        <>  
           <h1>Checkout</h1>
                <CartContents />
            <Button onClick={checkout}> 
                Make Payment 
            </Button>
        </>
    )
}