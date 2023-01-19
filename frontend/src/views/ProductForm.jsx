import * as React from 'react';
import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../components/Button';
import axios from 'axios';

export default function ProductForm() {

  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);

  const productData = useMemo(() => {
    return {
      productTitle: productTitle,
      productDesc: productDesc,
      productPrice: productPrice,
      productQuantity: productQuantity,
      productImageUrl: productImageUrl
    }
  }, [productTitle, productDesc, productPrice, productQuantity, productImageUrl])

  const handleSubmit = async (event) => {
    event.preventDefault;
    await axios.post('/addProduct', productData);
    await axios.get('/')
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
      <div>
        <TextField
          required
          id="outlined-required"
          label="Title"
          defaultValue="GPU Nvidia"
          onChange={(event) => {
            setProductTitle(event.target.value)
          }}
        />
      </div>
      <div>
        <TextField
          required
          id="filled-required"
          label="Product Description"
          defaultValue="Description"
          variant="filled"
         onChange={(event) => {
            setProductDesc(event.target.value)
          }}
        />
      </div>
      <div style={{'display': 'flex'}}>
        <TextField
          required
          id="standard-required"
          label="Product Image URL"
          defaultValue="Image URL"
          variant="standard"
          onChange={(event) => {
            setProductImageUrl(event.target.value)
          }}
        />
        <img src={productImageUrl} alt="" style={{'maxWidth': '50px', 'maxHeight': '50px'}}/>
      </div>
      <div>
        <TextField
          required
          id="standard-required"
          label="Product Price"
          defaultValue="Price"
          variant="standard"
          onChange={(event) => {
            setProductPrice(event.target.value)
          }}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-required"
          label="Product Quantity"
          defaultValue="Quantity"
          variant="standard"
          onChange={(event) => {
            setProductQuantity(event.target.value)
          }}
        />
      </div>
      <Button onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}