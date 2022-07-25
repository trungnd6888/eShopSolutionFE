import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import React, { useEffect } from 'react';
import userApi from '../../api/UserApi';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function Login() {
    const schema = yup.object().shape({
        username: yup.string().required("The username field is required"),
        password: yup.string().required("The password field is required").min(6),
        rememberMe: yup.bool()
    });

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;
    const { errors, touchedFields } = formState;

    const onSubmit = (values) => console.log('form values on submit: ', values);

    console.log(errors, touchedFields);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await userApi.login({
                    username: null,
                    password: null,
                    rememberMe: true
                });

                console.log('Fetch data: ', data);
            } catch (error) {
                console.log("Fetch data is failed: ", error);
            }
        }

        // fetchData();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 9
            }} >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mt: 1 }} >
                    Sign in
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("username")}
                        variant="outlined"
                        label="Username"
                        fullWidth
                        autoFocus
                        sx={{ mb: 3 }}
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                    ></TextField>
                    <TextField
                        {...register("password")}
                        type="password"
                        variant="outlined"
                        label="Password"
                        fullWidth
                        sx={{ mb: 1 }}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    ></TextField>
                    <FormControlLabel
                        control={<Checkbox {...register("rememberMe")} color="primary" />}
                        label="Remember me"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Sign in</Button>
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
        </Container >
    );
}

export default Login;