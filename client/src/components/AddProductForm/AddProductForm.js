import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/system/Box';
import {
    useAddProductMutation
} from "../../features/api/apiSlice";

export default function AddProductForm({ setShowAddProductForm, refetch, setOpen, setMessage }) {
    const [addProduct] = useAddProductMutation();

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);

    const params = {
        product_title: title,
        product_description: description,
        product_price: price
    }

    const submitForm = (e) => {
        e.preventDefault();
        addProduct(params);
        setShowAddProductForm(false);
        refetch();
        setMessage(`Added ${title} to your products`);
        setOpen(true);
    }

    return (
        <Card sx={{ maxWidth: 512 }} component="form" onSubmit={submitForm}>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <IconButton onClick={(e) => setShowAddProductForm(false)}>
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