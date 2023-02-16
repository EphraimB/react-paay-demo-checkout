import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from "react-router-dom";
import logo from '../../img/logo.png';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function NavDrawer({ openDrawer, handleDrawerToggle }) {
    const navigate = useNavigate()

    return (
        <Drawer
            anchor='left'
            open={openDrawer}
            onClose={handleDrawerToggle}
        >
            <Box
                sx={{ 
                    width: 250
                }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
            >
                <Box sx={{
                    m: 2,
                }}>
                    <img src={logo} width="100" alt="Logo" />
                    <Typography variant="subtitle1">PAAY demo checkout</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/')}>Home</ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}