import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContextProvider';
import Button from '../components/Button';
import CartContents from './CartContents';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function OrderHistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrderHistory();
    }, [])


    const getOrderHistory = async () => {
        const orderHistory = await axios.get('/order-history');
        setOrders(orderHistory.data);
    }

    const handleClick = () => {
        navigate('/')
    }

    return (
        <>  
           <h1>Order History</h1>
           { orders.length ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {orders.map((product, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {product.title}
                        </TableCell>
                        <TableCell align="right">$ {product.price / 100}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            :
            <div>
                <h3>You have no orders</h3>
                <Button onClick={handleClick}>Start Shopping</Button>
            </div>
            }
       </>
    )
}