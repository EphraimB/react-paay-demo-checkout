import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Product from '../../components/Product/Product';
import EditForm from '../../components/EditForm/EditForm';
import DeleteForm from '../../components/DeleteForm/DeleteForm';
import { useSelector } from 'react-redux';
import {
    useGetProductsQuery
} from "../../features/api/apiSlice";
import AddProductForm from '../../components/AddProductForm/AddProductForm';

export default function HomePage({ isAdmin, itemsRefetch, setOpenSnackbar, setSnackbarMessage }) {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetProductsQuery();

    const { editMode, deleteMode } = useSelector((state) => state.productState);

    let content;

    if (isLoading) {
        content = 'Loading';
    } else if (isSuccess) {
        content = products.map((product) => (
            !deleteMode.includes(product.product_id) && !editMode.includes(product.product_id) ? (
                <Product product={product} isAdmin={isAdmin} setOpen={setOpenSnackbar} setMessage={setSnackbarMessage} itemsRefetch={itemsRefetch} />
            ) : deleteMode.includes(product.product_id) ? (
                <DeleteForm product={product} refetch={refetch} setOpen={setOpenSnackbar} setMessage={setSnackbarMessage} />
            ) : editMode.includes(product.product_id) ? (
                <EditForm product={product} refetch={refetch} />
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
            <Grid id="products" container spacing={2} columns={{ xs: 12, md: 4 }} sx={{ m: 2 }}>
                {showAddProductForm ? <AddProductForm setShowAddProductForm={setShowAddProductForm} refetch={refetch} setOpen={setOpenSnackbar} setMessage={setSnackbarMessage} /> : null}
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