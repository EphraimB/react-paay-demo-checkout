import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import placeholderImage from "../../img/image.png";
import Fab from "@mui/material/Fab";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import {
    useGetProductQuery,
    useAddItemMutation
} from "../../features/api/apiSlice";

export default function DetailsPage({ itemsRefetch }) {
    const id = window.location.pathname.split("/")[2];

    const navigate = useNavigate();

    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetProductQuery({ id });

    const [addItem] = useAddItemMutation();

    const params = {
        product_id: id,
    }

    const handleAddToCart = () => {
        addItem(params);

        itemsRefetch();

        navigate('/');
    }

    let content;

    if (isLoading) {
        content = 'Loading';
    } else if (isSuccess) {
        content = (
            <Box sx={{ m: 2 }} >
                <Grid container spacing={2} direction="row" sx={{ alignItems: "center" }}>
                    <Grid item xs={12} md={2}>
                        <img src={product.product_image ? `http://localhost:5001/data/uploads/${product.product_image}` : placeholderImage} alt={product.product_title} width={500} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">{product.product_title}</Typography>
                        <Typography variant="body1">{product.product_description}</Typography>
                        <Typography variant="h6">{product.product_price}</Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    } else if (isError) {
        content = <Typography variant="body2">{error.toString()}</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6">Product details</Typography>

            {content}

            <Fab variant="extended" color="primary" onClick={handleAddToCart} sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }}><AddShoppingCartIcon />
                Add to cart
            </Fab>
        </Box>
    )
}