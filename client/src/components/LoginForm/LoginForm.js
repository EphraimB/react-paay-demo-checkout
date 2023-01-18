import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authActions';
import axios from 'axios';

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

export default function LoginForm({ onLoginSubmit }) {
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const submitForm = (data) => {
        if (data.username.length === 0) {
            alert('Enter username');
        }
        // check if passwords match
        if (data.password !== data.confirmPassword) {
          alert('Password mismatch');
        }
        dispatch(registerUser(data))
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
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    function handleLoginSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/login', {
            username: loginUsername,
            password: loginPassword
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        onLoginSubmit();
    }

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
                        noValidate
                        onSubmit={handleLoginSubmit}
                    >
                        <div>
                            <TextField id="username" key="loggedInUsername" label="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} variant="standard" />
                        </div>
                        <div>
                            <TextField id="password" key="loggedInPassword" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} label="Password" variant="standard" />
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
                        onSubmit={handleSubmit(submitForm)}
                    >
                        <div>
                            <TextField id="username" key="username" label="Username" {...register('username')} variant="standard" required />
                        </div>
                        <div>
                            <TextField id="password" key="password" type="password" label="Password" {...register('password')} variant="standard" required />
                        </div>
                        <div>
                            <TextField id="confirmPassword" type="password" label="Confirm password" {...register('confirmPassword')} variant="standard" required />
                        </div>
                        <Button type="submit" variant="contained" disabled={loading}>Register</Button>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
}