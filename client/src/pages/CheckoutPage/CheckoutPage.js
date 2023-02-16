import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckoutPage() {
    return (
        <Grid container spacing={2} sx={{
            m: 2,
        }}>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" variant="standard" fullWidth>
                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>Payment</FormLabel>
                    <Grid item xs={12} md={12}>
                        <TextField id="fullname" label="Name on card" variant="standard" helperText="Full name as displayed on card" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="cardnumber" label="Credit card number" variant="standard" helperText="xxxx xxxx xxxx xxxx format" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="expdate" label="Expiration date" variant="standard" helperText="xx/xx format" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="cvv" label="CVV" variant="standard" helperText="3 digit number" />
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" variant="standard" fullWidth>
                    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>Billing address</FormLabel>
                    <Grid item xs={12} md={6}>
                        <TextField id="firstname" label="First name" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="lastname" label="Last name" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField id="email" label="Email" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="address" label="Address" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="city" label="City" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="state" label="State" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="zip" label="Zip code" variant="standard" />
                    </Grid>
                </FormControl>
            </Grid>
        </Grid>
    );
}