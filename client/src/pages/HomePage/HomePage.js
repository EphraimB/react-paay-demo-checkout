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
import {
    useGetProductsQuery,
    useAddProductMutation
} from "../../features/api/apiSlice";

const AddProductForm = () => {
    const [addProduct] = useAddProductMutation();

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const showProductForm = () => {
        setShowAddProductForm(true);
    }

    const hideProductForm = () => {
        setShowAddProductForm(false);
    }

    const params = {
        product_title: title,
        product_description: description,
        product_price: price
    }

    const submitForm = (e) => {
        e.preventDefault();
        addProduct(params);
        hideProductForm();
    }

    return (
        <Card sx={{ maxWidth: 512 }} component="form" onSubmit={submitForm}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <IconButton onClick={hideProductForm}>
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
            <Button type="submit" variant="contained">Add Product</Button>
        </Card>
    )
}

export default function HomePage({ loggedIn, isAdmin }) {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsQuery();

    let content;

    if (isLoading) {
        content = 'Loading';
    } else if (isSuccess) {
        content = Object.values(products).map((product) => <Product product={product} isAdmin={isAdmin} />);
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const showProductForm = () => {
        setShowAddProductForm(true);
    }

    const hideProductForm = () => {
        setShowAddProductForm(false);
    }

    return (
        <>
            <AppBar loggedIn={loggedIn} />
            <Grid id="products" container spacing={2} columns={{ xs: 12, md: 4 }} sx={{ m: 2 }}>
                {showAddProductForm ? <AddProductForm /> : null}
                {content}
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