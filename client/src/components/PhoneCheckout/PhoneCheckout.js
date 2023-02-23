import './PhoneCheckout.css';
import logo from '../../img/logo.png';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function PhoneCheckout() {
    const handleCheckout = () => {
        alert('Phone checkout');
    }

    return (
        <div id="phoneCheckout">
            <img src={logo} height="20" />
            <input type="text" placeholder="Phone number" />
            <Button variant="contained" onClick={handleCheckout}>GO</Button>
        </div>
    )
}