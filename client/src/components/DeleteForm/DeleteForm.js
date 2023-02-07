import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useDispatch } from 'react-redux';
import { viewModeAction } from '../../features/productState/productStateSlice';

export default function DeleteForm({ product, handleDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch = useDispatch();

    const onDelete = async () => {
        dispatch(viewModeAction(product.product_id))
        setIsDeleting(true);
        await handleDelete(product.product_id);
        setIsDeleting(false);
        try {

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
                    {/* <Button size="small" variant="contained" color="secondary" onClick={(e) => dispatch(viewModeAction(product.product_id))}>No</Button> */}
                    {!isDeleting && <Button size="small" variant="contained" color="primary" onClick={onDelete}>Yes</Button>}
                </CardActions>
            </CardContent>
        </Card>
    )
};