import React, { useState, createContext, useMemo} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContextProvider";

const cartDefaults = {
    cart: [],
    addToCart: () => {},
    deleteFromCart: () => {},
    checkout: () => {}
}


export const CartContext = createContext(cartDefaults)

export function CartContextProvider({ children }) {
    const {authenticationStatus} = useContext(AuthenticationContext)
    const [cart, setCart] = useState([]);
    const addToCart = async (product) => {
        await axios.put('/order', product);
        if (authenticationStatus) {
            const {data: cartContents} = await axios.get('/cart') ;
            setCart(cartContents)
        } else {
            setCart(JSON.parse(Cookies.get('eshopCart')??'[]'))
        }
    }
    const deleteFromCart = async (product) => {
        await axios.delete('/order', {data: {id: product.id}});
        if (authenticationStatus) {
            const {data: cartContents} = await axios.get('/cart') ;
            setCart(cartContents)
        } else {
            setCart(JSON.parse(Cookies.get('eshopCart')??'[]'))
        }
    };

    const checkout = async () => {
        await axios.put('/buy');
        setCart([]);
    }

    useEffect(() => {
        (async () => {
            if (authenticationStatus) {
                const {data: cartContents} = await axios.get('/cart') ;
                setCart(cartContents)
            } else {
                setCart(JSON.parse(Cookies.get('eshopCart')??'[]'))
            }
        })();
    }, [authenticationStatus])

    const value = useMemo(() => {
        return {
            cart,
            addToCart,
            deleteFromCart,
            checkout
        }
    }, [cart, addToCart, deleteFromCart, authenticationStatus, checkout])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}