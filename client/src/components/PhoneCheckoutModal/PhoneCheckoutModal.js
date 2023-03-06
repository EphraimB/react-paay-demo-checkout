import Box from "@mui/system/Box";
import Modal from '@mui/material/Modal';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import popupBackground from "../../img/popup.png";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import {
    useGetOrdersQuery
} from "../../features/api/apiSlice";

export default function PhoneCheckoutModal({ openPhoneCheckoutModal, setOpenPhoneCheckoutModal }) {
    const {
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetOrdersQuery();

    const style = {
        position: 'absolute',
        color: 'white',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 200,
        backgroundImage: `url(${popupBackground})`,
        backgroundSize: "cover",
        boxShadow: 24,
        p: 4,
    };

    const linkStyle = {
        color: 'white',
    }

    const handleClose = () => {
        setOpenPhoneCheckoutModal(false);
    }

    const content = isLoading ? <Typography variant="h5" color="white" component="p">Loading...</Typography> : (isSuccess && orders.confirmed === true) ? <Typography variant="h5" color="white" component="p">Payment confirmed!</Typography> : (isSuccess && orders[0].confirmed === false) ? <Typography variant="h5" color="white" component="p">Please check your phone now to approve this payment.</Typography> : null;

    return (
        <Modal
            open={openPhoneCheckoutModal}
            onClose={handleClose}>
            <Box sx={style}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <IconButton style={linkStyle} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {content}
                <Stack direction="row" sx={{
                    mt: 5,
                    color: "white",
                    justifyContent: "space-between",
                }}>
                    <Link to="" style={linkStyle} onClick={handleClose}>CANCEL</Link>
                    <Button variant="contained" color="primary">RESEND ALERT</Button>
                    <Link to="" style={linkStyle}>HELP</Link>
                </Stack>
            </Box>
        </Modal>
    )
}