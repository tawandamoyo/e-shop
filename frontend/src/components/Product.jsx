import * as React from 'react';
import { useState, useEffect, useMemo, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '../components/Button';
import axios from 'axios';
import { CartContext } from '../contexts/CartContextProvider';

export default function Product({product}) {
    const { addToCart } = useContext(CartContext)

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140, objectFit: "contain" }}
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
                <Button size="small" style={{backgroundColor: "blue"}}>{`$ ${product.price/100}`}</Button>
                <Button size="small" onClick={() => {
                    addToCart(product)
                }}>Add to Cart</Button>
            </CardActions>
        </Card>
    )
}