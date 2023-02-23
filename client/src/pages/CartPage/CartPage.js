import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import {
    useDeleteItemMutation
} from "../../features/api/apiSlice";
import PhoneCheckout from '../../components/PhoneCheckout/PhoneCheckout';

export default function CartPage({ itemsRefetch, setOpenSnackbar, setSnackbarMessage, itemsCount, items, totalPrice }) {
    const [deleteItem] = useDeleteItemMutation();
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    const handleDeleteItem = async (item) => {
        setIsDeleting(true);
        try {
            await deleteItem(item.cart_id);
            setIsDeleting(false);
            itemsRefetch();
            setSnackbarMessage(`Deleted ${item.product_title} from your cart`);
            setOpenSnackbar(true);
        } catch (err) {
            console.error(err);
            setIsDeleting(false);
        }
    }

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Cart
            </Typography>
            <Grid container direction="row">
                <Grid item xs={12} md={9}>
                    {items.map((item) => (
                        <Card key={`product-${item.cart_id}`} sx={{ maxWidth: 512, m: 2 }} id={`cart-${item.cart_id}`}>
                            <IconButton sx={{
                                float: 'right'
                            }} onClick={() => handleDeleteItem(item)}>
                                <CloseIcon />
                            </IconButton>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.product_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_price}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <PhoneCheckout />
            </Grid>
            {itemsCount > 0 ? <Fab variant="extended" color="primary" aria-label="Add to cart" sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }} onClick={handleCheckout}>
                <AddShoppingCartIcon />
                Checkout - {totalPrice}
            </Fab> : null}
        </>
    )
}