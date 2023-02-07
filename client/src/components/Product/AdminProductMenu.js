import React, {useState} from 'react';
import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { editModeAction, deleteModeAction } from '../../features/productState/productStateSlice';

export default function AdminProductMenu({ id }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteModeAction(id))
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="flex-end">
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVertIcon />
                </IconButton>
            </Stack>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </Box>
    )
};