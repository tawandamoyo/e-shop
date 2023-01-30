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


export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getProducts();
    },[]);

    async function getProducts() {
        const products = await axios.get('/items');
        // console.log(products.data);
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
                        <Card key = {index} sx={{ maxWidth: 345 }}>
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
                                <Button size="small">Add to Cart</Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </div>

            
        </>
    )
}