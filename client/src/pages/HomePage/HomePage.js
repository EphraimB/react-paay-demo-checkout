import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '../../components/AppBar/AppBar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/system/Box';
import Product from '../../components/Product/Product';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../features/Products/productActions';
import { viewMode, editMode, deleteMode } from '../../features/productState/productStateSlice';

export default function HomePage({ products, loggedIn, isAdmin }) {
    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const { loading, error, success } = useSelector(
        (state) => state.product
    );

    const productState = useSelector((state) => state.productState.mode);

    const dispatch = useDispatch();


    console.log(productState);

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

    const { register, handleSubmit } = useForm();

    const showProductForm = () => {
        setShowAddProductForm(true);
    }

    const hideProductForm = () => {
        setShowAddProductForm(false);
    }

    const submitForm = (data) => {
        dispatch(addProduct(data));
        hideProductForm();
    }

    const AddProductForm = () => {
        return (
            <Card sx={{ maxWidth: 512 }} component="form" onSubmit={handleSubmit(submitForm)}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <IconButton>
                        <CloseIcon onClick={hideProductForm} />
                    </IconButton>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <TextField id="title" label="Title" {...register('product_title')} variant="standard" required />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField id="description" label="Description" {...register('product_description')} variant="standard" required />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField id="price" label="Price" type="number" inputProps={{
                            step: 0.01,
                        }} {...register('product_price')} variant="standard" required />
                    </Typography>
                </CardContent>
                <Button type="submit" variant="contained" disabled={loading}>Add Product</Button>
            </Card>
        )
    }

    return (
        <>
            <AppBar loggedIn={loggedIn} />
            <Grid id="products" container spacing={2} columns={{ xs: 12, md: 4 }} sx={{ m: 2 }}>
                {showAddProductForm ? <AddProductForm /> : null}
                {Object.values(products).map((product) => {
                    return (
                        <Card sx={{ maxWidth: 512, m: 2 }} id={`product-${product.product_id}`} key={`product-${product.product_id}`}>
                            {isAdmin === 1 && productState === 0 ? (
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
                                        <MenuItem id={product.product_id} onClick={(e) => e.currentTarget.id === product.product_id ? dispatch(deleteMode()) : null}>Delete</MenuItem>
                                    </Menu>
                                </Box>
                            ) : null}
                            {productState === 0 ? <Product product={product} isAdmin={isAdmin} /> : null}
                        </Card>
                    )
                })
                }
            </Grid>
            {isAdmin === 1 ? <Fab color="primary" aria-label="add" sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }}>
                <AddIcon onClick={showProductForm} />
            </Fab> : null}
        </>
    );
}