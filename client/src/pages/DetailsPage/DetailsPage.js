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
    } = useGetProductQuery(2);

    let content;

    return (
        <Box>
            <Typography variant="h6">Product details</Typography>

            {isLoading ? content = 'Loading' : isSuccess ? content = <Typography variant="body2">{products.product_title}</Typography> : isError ? content = <Typography variant="body2">{error.toString()}</Typography> : null}
        </Box>
    )
}