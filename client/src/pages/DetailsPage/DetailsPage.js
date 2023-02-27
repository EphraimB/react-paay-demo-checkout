import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    useGetProductQuery
} from "../../features/api/apiSlice";

export default function DetailsPage() {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetProductQuery({ id: window.location.pathname.split('/').substring(1) });

    let content;

    if (isLoading) {
        content = 'Loading';
    } else if (isSuccess) {
        content = <Typography variant="body2">{products.product_title}</Typography>;
    } else if (isError) {
        content = <Typography variant="body2">{error.toString()}</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6">Product details</Typography>

            {content}
        </Box>
    )
}