import React, {useEffect, useState} from "react";
import { ReactDOM } from "react";
import axios from "axios";

export default function PriceBox(props) {
    const { order } = props;
    const [ price, setPrice ] = useState(0);

    useEffect(() => {
        (async () => {
            const serverResponse = await axios.put('/price', order);
            setPrice(serverResponse.data.price);
        })();
    }, [order]);

    return (
        <>
            <h2>total price</h2>
            <h3>Price: {price}</h3>
        </>
    )
}