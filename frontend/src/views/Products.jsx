import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '../components/Button';
import axios from 'axios';
import Product from '../components/Product';


export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getProducts();
    },[]);

    async function getProducts() {
        const products = await axios.get('/items');
        setProducts(products.data);
    }

    const filteredProducts = useMemo(() => {
        return  products.filter((product) => {
                    return product.product_title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
                }
        )
    }, [products, searchQuery]);

    return (
        <>
            <h1>Products</h1>
    
            <div>
                <TextField
                    onInput={(e)=> {
                        setSearchQuery(e.target.value);
                    }}
                    value = {searchQuery}
                    placeholder = 'search products'
                />
            </div>
            <div>
                <div><h3>{searchQuery.length === 0 ? 'Products' : 'Search Results'}</h3></div>
                {filteredProducts.map((product, index) => {
                    return (
                        <Product 
                            product={product} key = {index}
                        />
                    )
                })}
            </div>

            
        </>
    )
}