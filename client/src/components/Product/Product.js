import React, { useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { viewModeAction, editModeAction, deleteModeAction } from '../../features/productState/productStateSlice';
import { deleteProduct, editProduct } from '../../features/Products/productActions';

export default function Product({ product, isAdmin }) {
    const [title, setTitle] = useState(product.product_title);
    const [description, setDescription] = useState(product.product_description);
    const [price, setPrice] = useState(product.product_price.substring(1));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(deleteModeAction(product.product_id))
        handleClose();
    }

    const handleEdit = () => {
        dispatch(editModeAction(product.product_id))
        handleClose();
    }

    const handleViewMode = () => {
        dispatch(viewModeAction(product.product_id));
    }

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(product.product_id));
    }

    const params = {
        product_id: product.product_id,
        product_title: title,
        product_description: description,
        product_price: price
    }

    const handleEditForm = (e) => {
        dispatch(editProduct(params));
    }

    const { editMode, deleteMode } = useSelector((state) => state.productState);

    const { loading, error, success } = useSelector(
        (state) => state.product
    );

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
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
        ) : deleteMode.includes(product.product_id) ? (
            <Card key={`product-${product.product_id}`} sx={{ maxWidth: 512, m: 2 }} id={`product-${product.product_id}`}>
                <CardContent>
                    <Typography>
                        Are you sure you want to delete "{product.product_title}"
                    </Typography>
                    <CardActions>
                        <Button size="small" onClick={handleViewMode}>No</Button>
                        <Button size="small" onClick={handleDeleteProduct}>Yes</Button>
                    </CardActions>
                </CardContent>
            </Card>
        ) : editMode.includes(product.product_id) ? (
            <Card component="form" onSubmit={handleEditForm} key={`product-${product.product_id}`} sx={{ maxWidth: 512, m: 2 }} id={`product-${product.product_id}`}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <IconButton onClick={handleViewMode}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <TextField id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant="standard" required />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField id="description" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} variant="standard" required />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField id="price" label="Price" type="number" inputProps={{
                            step: 0.01,
                        }} value={price} onChange={(e) => setPrice(e.target.value)} variant="standard" required />
                    </Typography>
                </CardContent>
                <Button type="submit" variant="contained" disabled={loading}>Edit Product</Button>
            </Card >
        ) : null
    )
}