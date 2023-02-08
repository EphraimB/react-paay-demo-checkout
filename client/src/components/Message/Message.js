import React from "react";
import Snackbar from '@mui/material/Snackbar';

export default function Message({ open, setOpen, message }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={(e) => setOpen(false)}
            message={message}
        />
    );
}