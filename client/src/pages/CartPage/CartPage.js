import React, {useState} from 'react';
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
    useGetItemsQuery,
    useDeleteItemMutation
} from "../../features/api/apiSlice";

export default function CartPage({ itemsRefetch, setOpenSnackbar, setSnackbarMessage, itemsCount }) {
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

    const {
        data: itemsData,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetItemsQuery();

    let content;

    if (isLoading) {
        content = 'Loading';
    } else if (isSuccess) {
        content = itemsData.items.map((item) => (
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
        ));
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Cart
            </Typography>
            <Grid>
                {content}
            </Grid>
            {itemsCount > 0 ? <Fab variant="extended" color="primary" aria-label="Add to cart" sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }} onClick={handleCheckout}>
                <AddShoppingCartIcon />
                Checkout - {itemsData.totalPrice}
            </Fab> : null}
        </>
    )
}