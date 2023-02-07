import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { viewModeAction } from '../../features/productState/productStateSlice';
import {
    useEditProductMutation
} from "../../features/api/apiSlice";

export default function EditForm({ product }) {
    const [title, setTitle] = useState(product.product_title);
    const [description, setDescription] = useState(product.product_description);
    const [price, setPrice] = useState(product.product_price.substring(1));

    const dispatch = useDispatch();

    const [editForm] = useEditProductMutation();

    const params = {
        product_title: title,
        product_description: description,
        product_price: price,
        product_id: product.product_id
    }

    const handleEditForm = (e) => {
        e.preventDefault();
        editForm(params);
        dispatch(viewModeAction(product.product_id));
    }

    const handleViewMode = () => {
        dispatch(viewModeAction(product.product_id));
    }

    return (
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
                <input type="hidden" name="id" value={product.product_id} />
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
            <Button type="submit" variant="contained">Edit Product</Button>
        </Card>
    )
};