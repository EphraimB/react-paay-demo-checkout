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
    useGetProductsQuery
} from "../../features/api/apiSlice";
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import Snackbar from '@mui/material/Snackbar';

export default function HomePage({ loggedIn, isAdmin, itemsCount, refetchLogin, itemsRefetch }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

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
                <Product product={product} isAdmin={isAdmin} setOpen={setOpen} setMessage={setMessage} itemsRefetch={itemsRefetch} />
            ) : deleteMode.includes(product.product_id) ? (
                <DeleteForm product={product} refetch={refetch} setOpen={setOpen} setMessage={setMessage} />
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
            <AppBar loggedIn={loggedIn} itemsCount={itemsCount} refetchLogin={refetchLogin} />
            <Grid id="products" container spacing={2} columns={{ xs: 12, md: 4 }} sx={{ m: 2 }}>
                {showAddProductForm ? <AddProductForm setShowAddProductForm={setShowAddProductForm} refetch={refetch} setOpen={setOpen} setMessage={setMessage} /> : null}
                {content}
            </Grid>
            {isAdmin === 1 ? <Fab color="primary" aria-label="add" sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }}>
                <AddIcon onClick={showProductForm} />
            </Fab> : null}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </>
    );
}