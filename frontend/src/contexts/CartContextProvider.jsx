import React, { useState, createContext, useMemo} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const cartDefaults = {
    cart: [],
    addToCart: () => {}
}


export const CartContext = createContext(cartDefaults)

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const addToCart = async (product) => {
        await axios.put('/order', product);
        setCart(JSON.parse(Cookies.get('eshopCart')??'[]'))
    }

    useEffect(() => {
        setCart(JSON.parse(Cookies.get('eshopCart')??'[]'))
    }, [])

    const value = useMemo(() => {
        return {
            cart,
            addToCart
        }
    }, [cart, addToCart])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}