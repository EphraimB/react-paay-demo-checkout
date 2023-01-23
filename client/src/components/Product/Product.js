import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Product({ product }) {
    return (
        <>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.product_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.product_description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.product_price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button size="small">Details</Button>
            </CardActions>
        </>
    )
}