import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import AuthButton from './AuthButton';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Cart from './CartIcon';
import { AuthenticationContext } from '../contexts/AuthenticationContextProvider';

function UserMenu() {
    const navigate = useNavigate();
    const {authenticationStatus, onLogout} = useContext(AuthenticationContext);
    const [role, setRole] = useState('');
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const getRole = async () => {
      const user = await axios.get('/user');
      setRole(user.data)
    }

    useEffect(() => {
      getRole();
    }, [role])

    console.log(role);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    
    const handleLogout = async () => {
      await axios.get('/logout')
      onLogout();
    }

    const handleUploadProduct = () => {
      navigate('/upload')
    }

    const handleUpgrade = async () => {
      const upgradeToSeller = await axios.put('/user');
      console.log(upgradeToSeller);
    }


    const handleOrderHistory = () => {
      navigate('/order-history')
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem>
                  <Typography textAlign="center" onClick={null}>Settings</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={handleOrderHistory}>History</Typography>
                </MenuItem>
                <MenuItem>
                  { (role === 'seller') ? 
                  <Typography textAlign="center" onClick={handleUploadProduct}>Upload Product</Typography>
                  : <Typography textAlign="center" onClick={handleUpgrade}>Upgrade to Seller</Typography> }
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default UserMenu;

