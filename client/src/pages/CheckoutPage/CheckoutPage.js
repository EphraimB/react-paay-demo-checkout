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
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function CheckoutPage({ items, totalPrice }) {
    const titleStyle = {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    };

    return (
        <Grid container component="form" direction="row" xs={12} spacing={2} sx={{
            m: 2,
        }}>
            <Grid item container xs={12} md={9} direction="row" spacing={2}>
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
            <Grid item container xs={12} md={3} direction="column" spacing={2}>
                <Typography variant="h4" component="h3">Your cart</Typography>

                <Grid>
                    {items.map((item) => (
                        <Card key={`product-${item.cart_id}`} sx={{ maxWidth: 512, m: 2 }} id={`cart-${item.cart_id}`}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.product_title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product_price}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <Card sx={{ maxWidth: 512, m: 2 }} id={`cart-total`}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Total (USD)
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                {totalPrice}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Button variant="contained" sx={{ m: 2 }}>Place order</Button>
            </Grid>
        </Grid>
    );
}