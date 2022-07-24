import { Avatar, Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import FormControlLabel from '@mui/material/FormControlLabel';

Login.propTypes = {

};

function Login(props) {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 9
            }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
                    Sign in
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        label="Username"
                        required
                        fullWidth
                        autoFocus
                        sx={{ mb: 3 }}
                    ></TextField>
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Password"
                        required
                        fullWidth
                        sx={{ mb: 1 }}
                    ></TextField>
                    {/* <Box sx={{ mt: 1, r: , position: 'relative', display: "flex", alignItems: "center" }}>
                        <Checkbox />
                        Remember me
                    </Box> */}

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button variant="contained" fullWidth sx={{ mt: 3 }}>Sign in</Button>
                    <Box sx={{
                        mt: 2.4,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Link variant="body2" sx={{ cursor: 'pointer' }}>Forgot password?</Link>
                        <Link variant="body2" sx={{ cursor: 'pointer' }}>Don't have an account? Sign Up</Link>
                    </Box>
                </Box>
            </Box>
            <Box textAlign="center" sx={{ mt: 8 }}>
                <Typography variant="body2" color="text.secondary">
                    Copyright ©&nbsp;
                    <Link color="inherit" sx={{ cursor: 'pointer' }}>E Shop</Link>
                    &nbsp;2022.
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;