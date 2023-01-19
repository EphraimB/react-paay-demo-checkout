import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '../../components/AppBar/AppBar';
import ImageIcon from '@mui/icons-material/Image';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/system/Box';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../features/Products/productActions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';

function HomePage({ products, loggedIn, isAdmin }) {
    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const { loading, error, success } = useSelector(
        (state) => state.product
    );
    const dispatch = useDispatch();
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
                        <Card sx={{ maxWidth: 512, m: 2 }}>
                            {isAdmin === 1 ? (
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end">
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Stack>
                            ) : null}
                            {/* {product.image === null ? <ImageIcon /> :
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.image}
                                    alt={product.imageDescription}
                                />
                            } */}
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

export default HomePage;