import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../components/Button';
import axios from 'axios';


export default function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    },[]);
    console.log(products);
   

    async function getProducts() {
        const products = await axios.get('/items');
        // console.log(products.data);
        setProducts(products.data);
    }
    return (
        <>
            <h1>Products</h1>
            <div>
                {products.map((product) => {
                    return (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={product.image_url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {product.product_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {product.product_desc}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Buy</Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </div>

            
        </>
    )
}