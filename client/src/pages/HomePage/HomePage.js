import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import AppBar from '../../components/AppBar/AppBar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Product from '../../components/Product/Product';
import EditForm from '../../components/EditForm/EditForm';
import DeleteForm from '../../components/DeleteForm/DeleteForm';
import { useSelector } from 'react-redux';
import {
    useGetProductsQuery,
    useDeleteProductMutation
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

    const { editMode, deleteMode } = useSelector((state) => state.productState);

    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = (productId) => {
        deleteProduct(productId);
    }

    let content;

    if (isLoading) {
        content = 'Loading';
    } else if (isSuccess) {
        content = Object.values(products).map((product) => (
            !deleteMode.includes(product.product_id) && !editMode.includes(product.product_id) ? (
                <Product product={product} isAdmin={isAdmin} />
            ) : deleteMode.includes(product.product_id) ? (
                <DeleteForm product={product} handleDelete={handleDelete} />
            ) : editMode.includes(product.product_id) ? (
                <EditForm product={product} />
            ) : null
        ));
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const showProductForm = () => {
        setShowAddProductForm(true);
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