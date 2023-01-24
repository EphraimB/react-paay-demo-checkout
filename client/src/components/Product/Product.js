import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { viewModeAction, editModeAction, deleteModeAction } from '../../features/productState/productStateSlice';

export default function Product({ product, isAdmin }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {

    }

    const {editMode, deleteMode} = useSelector((state) => state.productState);

    const dispatch = useDispatch();

    return (
        !deleteMode.includes(product.product_id) && !editMode.includes(product.product_id) ? (
        <Card key={`product-${product.product_id}`} sx={{ maxWidth: 512, m: 2 }} id={`product-${product.product_id}`}>
            {isAdmin === 1 ? (
                <Box>
                    <Stack
                        direction="row"
                        justifyContent="flex-end">
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    </Stack>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={() => dispatch(deleteModeAction(product.product_id))}>Delete</MenuItem>
                    </Menu>
                </Box>
            ) : null}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.product_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.product_description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.product_price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>
        ) : null
    )
}