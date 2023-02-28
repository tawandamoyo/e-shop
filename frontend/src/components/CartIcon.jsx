import * as React from 'react';
import { useContext } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../contexts/CartContextProvider';
import Modal from '../components/Modal';
import CartContents from '../views/CartContents';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

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

export default function CustomizedBadges() {
  const {cart} = useContext(CartContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="cart" onClick={handleOpen}>
        <StyledBadge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Modal open={open} handleClose={handleClose} style={style}>
        <CartContents handleClose={handleClose}/>
      </Modal>
    </>
  );
}