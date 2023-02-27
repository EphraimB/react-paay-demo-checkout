import React, { useState } from 'react';
import './PhoneCheckout.css';
import logo from '../../img/logo.png';
import Button from "@mui/material/Button";

export default function PhoneCheckout() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChange = (e) => {
        if (isNaN(e.target.value)) return;
        if (e.target.value.length > 10) return;

        setPhoneNumber(e.target.value);
    }

    const handleCheckout = () => {
        alert('Phone checkout');
    }

    return (
        <div id="phoneCheckout">
            <img src={logo} alt="logo" height="20" />
            <input type="text" value={phoneNumber} onChange={handleChange} placeholder="Phone number" />
            <Button variant="contained" onClick={handleCheckout}>GO</Button>
        </div>
    )
}