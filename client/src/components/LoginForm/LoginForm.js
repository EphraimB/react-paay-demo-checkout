import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginForm() {
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
    const [value, setValue] = React.useState(0);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function validateForm() {

        return username.length > 0 && password.length > 0;

    }

    function handleSubmit(event) {

        

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
                        onSubmit={handleSubmit()}
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField id="username" label="Username" variant="standard" />
                        </div>
                        <div>
                            <TextField id="password" type="password" label="Password" variant="standard" />
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
                        autoComplete="off"
                    >
                        <div>
                            <TextField id="username" label="Username" variant="standard" />
                        </div>
                        <div>
                            <TextField id="password" type="password" label="Password" variant="standard" />
                        </div>
                        <div>
                            <TextField id="confirmPassword" type="password" label="Confirm password" variant="standard" />
                        </div>
                        <Button type="submit" variant="contained">Register</Button>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
}