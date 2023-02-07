import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import AppBar from '../../components/AppBar/AppBar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Product from '../../components/Product/Product';
import {
    useGetProductsQuery,
} from "../../features/api/apiSlice";
import AddProductForm from '../../components/AddProductForm/AddProductForm';

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
                {showAddProductForm ? <AddProductForm setShowAddProductForm={setShowAddProductForm} /> : null}
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