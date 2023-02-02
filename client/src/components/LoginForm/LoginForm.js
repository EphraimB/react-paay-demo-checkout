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
import { registerUser, userLogin } from '../../features/auth/authActions';
import { hide } from '../../features/Popup/popupSlice';
import { useNavigate } from "react-router-dom";
import {
    useLoginMutation
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

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const submitForm = (data) => {
        if (data.username.length === 0) {
            alert('Enter username');
            return false;
        }
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert('Password mismatch');
            return false;
        }
        dispatch(registerUser(data));
        navigate('/');
    }

    const data = {
        username,
        password
    }

    const submitLoginForm = (e) => {
        e.preventDefault();
        login(data);
        dispatch(hide());
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
                        <Button type="submit" variant="contained">Register</Button>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
}