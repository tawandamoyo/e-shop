import React, { useState, createContext, useMemo} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContextProvider";

const cartDefaults = {
    cart: [],
    addToCart: () => {}
}


export const CartContext = createContext(cartDefaults)

export function CartContextProvider({ children }) {
    const {authenticationStatus} = useContext(AuthenticationContext)
    const [cart, setCart] = useState([]);
    const addToCart = async (product) => {
        await axios.put('/order', product);
        if (authenticationStatus) {
            const {datloga: cartContents} = await axios.get('/cart') ;
            setCart(cartContents)
        } else {
            setCart(JSON.parse(Cookies.get('eshopCart')??'[]'))
        }
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
            addToCart
        }
    }, [cart, addToCart, authenticationStatus])

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}