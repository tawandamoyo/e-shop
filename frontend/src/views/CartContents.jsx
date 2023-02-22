import React, {useEffect, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '../components/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { CartContext } from '../contexts/CartContextProvider';



export default function CartContents() {

    const {cart, deleteFromCart} = useContext(CartContext);

    function price(item) {
        return item.price;
    }

    function sum(prev, next) {
        return prev + next;
    }

    const totalPrice = cart.map(price).reduce(sum, 0) / 100;
    
    console.log(cart);

  return (
    <>
        <div>
            <h2>My Shopping Cart</h2>
            <p>You have {cart ? cart.length : 0 } products in your cart</p>
        </div>
        <div>
            <h3>Subtotal $ {totalPrice}</h3>
            <Button>Secure Checkout</Button>
            <Button>View / Edit Cart</Button>
        </div>
    
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Remove</TableCell>
                <TableCell align="right">Total Price</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {cart.map((product, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {product.title}
                </TableCell>
                <TableCell align="right">$ {product.price / 100}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => {
                            deleteFromCart(product)
                        }}>
                        < DeleteIcon /> 
                    </IconButton>

                    
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>    
  );
}