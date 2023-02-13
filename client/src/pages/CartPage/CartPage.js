import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    useGetItemsQuery
} from "../../features/api/apiSlice";

export default function CartPage({ loggedIn, itemsCount }) {
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
            <p>{item.product_title}</p>
        ));
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <>
            <AppBar loggedIn={loggedIn} itemsCount={itemsCount} />
            <Box>
                <Typography variant="h2" gutterBottom>
                    Cart
                </Typography>
                {content}
            </Box>
        </>
    )
}