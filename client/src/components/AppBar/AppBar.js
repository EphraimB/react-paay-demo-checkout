import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginForm from '../LoginForm/LoginForm';
import LogoutForm from '../LogoutForm/LogoutForm';
import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from '../../features/Popup/popupSlice';
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar({ loggedIn, itemsCount, refetchLogin, setOpenDrawer, setOpenAlert, setAlertMessage, setAlertType }) {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const navigate = useNavigate()

    const popup = useSelector((state) => state.popup.show);
    const dispatch = useDispatch()

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const profileCircleClicked = () => popup ? dispatch(hide()) : dispatch(show());

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => navigate('/cart')}>
                <IconButton size="large" aria-label={`${itemsCount} items in cart" color="inherit`}>
                    <Badge badgeContent={itemsCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={profileCircleClicked}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => setOpenDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        PAAY demo checkout
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label={`${itemsCount} items in cart`} color="inherit" onClick={(e) => navigate('/cart')}>
                            <Badge badgeContent={itemsCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={profileCircleClicked}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            { popup ? loggedIn === null ? <LoginForm refetchLogin={refetchLogin} setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} /> : <LogoutForm refetchLogin={refetchLogin} setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} /> : null }
        </>
    );
}
