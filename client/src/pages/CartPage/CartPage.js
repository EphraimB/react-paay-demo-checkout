import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import placeholderImage from '../../img/image.png'
import CardMedia from '@mui/material/CardMedia';
import {
    useEditItemMutation,
    useDeleteItemMutation
} from "../../features/api/apiSlice";
import PhoneCheckout from '../../components/PhoneCheckout/PhoneCheckout';

export default function CartPage({ itemsRefetch, setOpenSnackbar, setSnackbarMessage, itemsCount, items, totalPrice }) {
    const [editItem] = useEditItemMutation();
    const [deleteItem] = useDeleteItemMutation();

    const navigate = useNavigate();

    const handleDeleteItem = async (item) => {
        try {
            await deleteItem(item.cart_id);
            itemsRefetch();
            setSnackbarMessage(`Deleted ${item.product_title} from your cart`);
            setOpenSnackbar(true);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCheckout = () => {
        navigate('/checkout');
    }

    const handleAddButton = async (item) => {
        console.log(item);
        try {
            await editItem({
                cart_id: item.cart_id,
                quantity: item.quantity + 1
            });
            itemsRefetch();
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubtractButton = async (item) => {
        try {
            await editItem({
                cart_id: item.cart_id,
                quantity: item.quantity - 1
            });
            itemsRefetch();
        } catch (err) {
            console.error(err);
        }
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
                                <img
                                    width="150"
                                    src={item.product_image ? `http://localhost:5001/data/uploads/${item.product_image}` : placeholderImage}
                                    alt={item.product_image ? item.product_title : "Placeholder image"}
                                />
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.product_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_price}
                                </Typography>
                                <Box sx={{
                                    border: '2px solid black',
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Quantity:
                                    </Typography>
                                    <Stack direction="row" justifyContent="center">
                                        <Button variant='contained' disabled={item.quantity <= 1 ? true : false} onClick={() => handleSubtractButton(item)}>-</Button>
                                        <Typography variant="h6" color="text.secondary">
                                            {item.quantity}
                                        </Typography>
                                        <Button variant='contained' onClick={() => handleAddButton(item)}>+</Button>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                {itemsCount > 0 ? <PhoneCheckout /> : null}
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