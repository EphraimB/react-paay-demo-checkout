import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { hide } from '../../features/Popup/popupSlice';
import { useDispatch } from 'react-redux';
import {
    useLogoutMutation
} from "../../features/api/apiSlice";

export default function LogoutForm({ refetchLogin }) {
    const [logout] = useLogoutMutation();

    const dispatch = useDispatch();

    const handleClick = () => {
        logout();
        dispatch(hide());
        refetchLogin();
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'flex-end',
                right: 0
            }}
        >
            <Paper>
                <Typography variant="h4" component="h2" paddingBottom={12}>
                    You're logged in
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="flex-end">
                    <IconButton aria-label="logout" onClick={handleClick}>
                        <LogoutIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </Box>
    );
}