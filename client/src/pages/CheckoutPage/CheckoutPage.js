import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PaidIcon from '@mui/icons-material/Paid';
import Fab from '@mui/material/Fab';

export default function CheckoutPage({ items, totalPrice, itemsCount }) {
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [billingFirstName, setBillingFirstName] = useState('');
    const [billingLastName, setBillingLastName] = useState('');
    const [billingEmail, setBillingEmail] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [billingAddress2, setBillingAddress2] = useState('');
    const [billingCountry, setBillingCountry] = useState(0);
    const [billingState, setBillingState] = useState('');
    const [billingZip, setBillingZip] = useState('');
    const [shippingFirstName, setShippingFirstName] = useState('');
    const [shippingLastName, setShippingLastName] = useState('');
    const [shippingEmail, setShippingEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingAddress2, setShippingAddress2] = useState('');
    const [shippingCountry, setShippingCountry] = useState(0);
    const [shippingState, setShippingState] = useState('');
    const [shippingZip, setShippingZip] = useState('');

    const titleStyle = {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    };

    const handlePay = () => {
        alert('Payment successful!');
    }

    return (
        <Box sx={{
            m: 2,
        }}>
            <Typography variant="h2" component="h2" gutterBottom>Checkout form</Typography>
            <Grid container component="form" direction="row" xs={12} spacing={2}>
                <Grid item container xs={12} md={9} direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend" sx={titleStyle}>Payment</FormLabel>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField id="fullname" label="Name on card" variant="standard" helperText="Full name as displayed on card" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField id="cardnumber" label="Credit card number" variant="standard" helperText="xxxx xxxx xxxx xxxx format" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField id="expdate" label="Expiration date" variant="standard" helperText="xx/xx format" value={expDate} onChange={(e) => setExpDate(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="cvv" label="CVV" variant="standard" helperText="3 digit number" value={cvv} onChange={(e) => setCVV(e.target.value)}  fullWidth />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend" sx={titleStyle}>Billing address</FormLabel>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField id="firstname" label="First name" variant="standard" value={billingFirstName} onChange={(e) => setBillingFirstName(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField id="lastname" label="Last name" variant="standard" value={billingLastName} onChange={(e) => setBillingLastName(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField id="email" label="Email" variant="standard" fullWidth value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField id="address" label="Address" variant="standard" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}  fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField id="address2" label="Address2" variant="standard" value={billingAddress2} onChange={(e) => setBillingAddress2(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Select
                                        id="country"
                                        value={billingCountry}
                                        label="Country"
                                        onChange={(e) => setBillingCountry(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value={0}>United States</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField id="state" label="State" variant="standard" value={billingState} onChange={(e) => setBillingState(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField id="zip" label="Zip code" variant="standard" value={billingZip} onChange={(e) => setBillingZip(e.target.value)} fullWidth />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset" variant="standard">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel component="legend" sx={titleStyle}>Shipping address</FormLabel>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Shipping same as billing"
                                    labelPlacement="start"
                                />
                            </Box>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField id="firstname" label="First name" variant="standard" value={shippingFirstName} onChange={(e) => setShippingFirstName(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField id="lastname" label="Last name" variant="standard" value={shippingLastName} onChange={(e) => setShippingLastName(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField id="email" label="Email" variant="standard" value={shippingEmail} onChange={(e) => setShippingEmail(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField id="address" label="Address" variant="standard" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField id="address2" label="Address2" variant="standard" value={shippingAddress2} onChange={(e) => setShippingAddress2(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Select
                                        id="country"
                                        value={shippingCountry}
                                        label="Country"
                                        onChange={(e) => setShippingCountry(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value={0}>United States</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField id="state" label="State" variant="standard" value={shippingState} onChange={(e) => setShippingState(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField id="zip" label="Zip code" variant="standard" value={shippingZip} onChange={(e) => setShippingZip(e.target.value)} fullWidth />
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
                </Grid>
            </Grid>
            {itemsCount > 0 ? <Fab variant="extended" color="primary" aria-label="Pay" sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }} onClick={handlePay}>
                <PaidIcon />
                Pay
            </Fab> : null}
        </Box>
    );
}