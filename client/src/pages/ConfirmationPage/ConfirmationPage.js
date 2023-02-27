import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Thank you for your order!
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Your order number is: 123456
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
                You will receive an email confirmation shortly.
            </Typography>
            <Button variant="contained" onClick={handleHomeButton} sx={{ mt: 2 }}>
                Return to Home Page
            </Button>
        </Box>
    )
}