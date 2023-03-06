import React, { useState } from 'react';
import './PhoneCheckout.css';
import logo from '../../img/logo.png';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
    useCheckoutMutation
} from "../../features/api/apiSlice";

export default function PhoneCheckout({ openPhoneCheckoutModal, setOpenPhoneCheckoutModal }) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    const [checkout] = useCheckoutMutation();

    const handleChange = (e) => {
        if (isNaN(e.target.value)) return;
        if (e.target.value.length > 10) return;

        setPhoneNumber(e.target.value);
    }

    const data = {
        phoneNumber: phoneNumber
    }

    const handleCheckout = () => {
        // checkout(data);
        setOpenPhoneCheckoutModal(true);
    }

    return (
        <div id="phoneCheckout">
            <img src={logo} alt="logo" height="20" />
            <input type="text" value={phoneNumber} onChange={handleChange} placeholder="Phone number" />
            <Button variant="contained" onClick={handleCheckout}>GO</Button>
        </div>
    )
}