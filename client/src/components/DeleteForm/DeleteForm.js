import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useDispatch } from 'react-redux';
import { viewModeAction } from '../../features/productState/productStateSlice';
import {
    useDeleteProductMutation
} from "../../features/api/apiSlice";

export default function DeleteForm({ product, refetch, setOpen, setMessage }) {
    const [deleteProduct] = useDeleteProductMutation();
    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        dispatch(viewModeAction(product.product_id));
        setIsDeleting(true);
        try {
            await deleteProduct(product.product_id);
            setIsDeleting(false);
            refetch();
            setMessage(`Deleted ${product.product_title} from your products`);
            setOpen(true);
        } catch (err) {
            console.error(err);
            setIsDeleting(false);
        }
    }

    return (
        <Card key={`product-${product.product_id}`} sx={{ maxWidth: 512, m: 2 }} id={`product-${product.product_id}`}>
            <CardContent>
                <Typography>
                    Are you sure you want to delete "{product.product_title}"
                </Typography>
                <CardActions>
                    <Button size="small" variant="contained" color="secondary" onClick={(e) => dispatch(viewModeAction(product.product_id))}>No</Button>
                    {!isDeleting && <Button size="small" variant="contained" color="primary" onClick={handleDelete}>Yes</Button>}
                </CardActions>
            </CardContent>
        </Card>
    )
};