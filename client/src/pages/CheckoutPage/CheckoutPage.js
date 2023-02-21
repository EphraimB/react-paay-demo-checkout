import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckoutPage() {
    const titleStyle = {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    };

    return (
        <Grid container xs={12} md={9} direction="row" spacing={2} sx={{
            m: 2,
        }}>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend" sx={titleStyle}>Payment</FormLabel>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField id="fullname" label="Name on card" variant="standard" helperText="Full name as displayed on card" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="cardnumber" label="Credit card number" variant="standard" helperText="xxxx xxxx xxxx xxxx format" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="expdate" label="Expiration date" variant="standard" helperText="xx/xx format" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="cvv" label="CVV" variant="standard" helperText="3 digit number" fullWidth />
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend" sx={titleStyle}>Billing addreess</FormLabel>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField id="firstname" label="First name" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="lastname" label="Last name" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField id="email" label="Email" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="address" label="Address" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="city" label="City" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="state" label="State" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="zip" label="Zip code" variant="standard" fullWidth />
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend" sx={titleStyle}>Shipping addreess</FormLabel>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField id="firstname" label="First name" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="lastname" label="Last name" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField id="email" label="Email" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="address" label="Address" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="city" label="City" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="state" label="State" variant="standard" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="zip" label="Zip code" variant="standard" fullWidth />
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>
        </Grid>
    );
}