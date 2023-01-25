import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

export default function LogoutForm() {

    function handleClick() {
        axios.post('http://localhost:5001/logout', {

        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        window.location.reload();
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