import React, {  } from 'react';
import Button from '../components/Button';
import CartContents from './CartContents';

export default function Checkout() {

    return (
        <>  
           <h1>Checkout</h1>
                <CartContents />
            <Button> 
                Make Payment 
            </Button>
        </>
    )
}