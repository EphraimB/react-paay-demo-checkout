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
    } = useGetProductQuery();


    return (
        <Box>
            <Typography variant="h6">Product details</Typography>
        </Box>
    )
}