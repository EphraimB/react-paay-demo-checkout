import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { viewModeAction } from '../../features/productState/productStateSlice';
import CardActions from '@mui/material/CardActions';
import {
    useDeleteProductMutation
} from "../../features/api/apiSlice";

export default function EditForm({ product }) {
    const dispatch = useDispatch();

    const [deleteProduct] = useDeleteProductMutation();

    const handleDeleteProduct = (e) => {
        e.preventDefault();
        deleteProduct(product.product_id);
        dispatch(viewModeAction(product.product_id));
    }

    const handleViewMode = () => {
        dispatch(viewModeAction(product.product_id));
    }

    return (
        <Card key={`product-${product.product_id}`} sx={{ maxWidth: 512, m: 2 }} id={`product-${product.product_id}`}>
                <CardContent>
                    <Typography>
                        Are you sure you want to delete "{product.product_title}"
                    </Typography>
                    <CardActions>
                        <Button size="small" variant="contained" color="secondary" onClick={handleViewMode}>No</Button>
                        <Button size="small" variant="contained" color="primary" onClick={handleDeleteProduct}>Yes</Button>
                    </CardActions>
                </CardContent>
            </Card>
    )
};