import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { CartContext } from '../contexts/CartContextProvider';
import { AuthenticationContext } from "../contexts/AuthenticationContextProvider";

const style = {
    position: 'absolute',
    top: '0%',
    left: '100%',
    transform: 'translateX(-100%)',
    maxWidth: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function CartContents(props) {
    const {open, handleClose} = props;
    const {authenticationStatus} = useContext(AuthenticationContext);
    const {cart, deleteFromCart} = useContext(CartContext);
    const navigate = useNavigate();

    function price(item) {
        return item.price;
    }

    function sum(prev, next) {
        return prev + next;
    }

    const totalPrice = cart.map(price).reduce(sum, 0) / 100;


    function checkout() {
        handleClose();
        if (authenticationStatus) {
            navigate('/checkout')
        } else {
            alert('You need to log in first')
        }
    }
    
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div>
                <h2>My Shopping Cart</h2>
                <p>You have {cart ? cart.length : 0 } products in your cart</p>
            </div>
            <div>
                <h3>Subtotal $ {totalPrice}</h3>
                <Button onClick={checkout}>Secure Checkout</Button>
            </div>
        
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Remove</TableCell>
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
        </Box>
    </Modal>
  );
}