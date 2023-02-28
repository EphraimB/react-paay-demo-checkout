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

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]');
        console.log(fileInput.files[0]);
        formData.append('product_image', fileInput.files[0]);
        formData.append('product_title', title);
        formData.append('product_description', description);
        formData.append('product_price', price);

        await addProduct(formData);
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
                <input type="file" id="image" name="product_image" value={image} onChange={(e) => setImage(e.target.value)} accept="image/jpeg" />
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