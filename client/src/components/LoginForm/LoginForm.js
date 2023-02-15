import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { hide } from '../../features/Popup/popupSlice';
import {
    useLoginMutation,
    useSignupMutation
} from "../../features/api/apiSlice";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function LoginForm({ refetchLogin, setOpenAlert, setAlertMessage, setAlertType }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameRegistration, setUsernameRegistration] = useState('');
    const [passwordRegistration, setPasswordRegistration] = useState('');
    const [confirmPasswordRegistration, setConfirmPasswordRegistration] = useState('');

    const [login] = useLoginMutation({
        onSuccess: () => {
            setAlertType("success");
            setAlertMessage("Login successful!");
            setOpenAlert(true);
        },
        onError: (error) => {
            setAlertType("error");
            setAlertMessage(`Login failed: ${error}`);
            setOpenAlert(true);
        }
    });
    const [signup] = useSignupMutation();

    const dispatch = useDispatch();

    const signupData = {
        username: usernameRegistration,
        password: passwordRegistration,
        confirmPassword: confirmPasswordRegistration
    }

    const submitForm = (e) => {
        e.preventDefault();
        signup(signupData);
        dispatch(hide());
        refetchLogin();
    }

    const data = {
        username,
        password
    }

    const submitLoginForm = async (e) => {
        e.preventDefault();

        await login(data);
        dispatch(hide());
        refetchLogin();
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        <Tab label="Sign in" {...a11yProps(0)} />
                        <Tab label="Register" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        onSubmit={submitLoginForm}
                    >
                        <div>
                            <TextField id="username" name="username" key="loggedInUsername" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="standard" required />
                        </div>
                        <div>
                            <TextField id="password" name="password" key="loggedInPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="standard" required />
                        </div>
                        <Button type="submit" variant="contained">Log in</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        onSubmit={submitForm}
                    >
                        <div>
                            <TextField id="username" key="username" label="Username" value={usernameRegistration} onChange={(e) => setUsernameRegistration(e.target.value)} variant="standard" required />
                        </div>
                        <div>
                            <TextField id="password" key="password" type="password" label="Password" value={passwordRegistration} onChange={(e) => setPasswordRegistration(e.target.value)} variant="standard" required />
                        </div>
                        <div>
                            <TextField id="confirmPassword" type="password" label="Confirm password" value={confirmPasswordRegistration} onChange={(e) => setConfirmPasswordRegistration(e.target.value)} variant="standard" required />
                        </div>
                        <Button type="submit" variant="contained">Register</Button>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
}