import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';

LoginForm.propTypes = {
    onSubmit: PropTypes.func
};

LoginForm.defaultValues = {
    onSubmit: null
};

function LoginForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object().shape({
        username: yup.string().required("Vui lòng điền tên đăng nhập"),
        password: yup.string().required("Vui lòng điền mật khẩu").min(6, "Mật khẩu tối thiểu 6 kí tự"),
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
    const { errors } = formState;
    // console.log(errors, touchedFields);

    const handleSubmitForm = (values) => {
        if (onSubmit) onSubmit(values);
    };

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }

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
                    Đăng nhập
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(handleSubmitForm)}>
                    <TextField
                        {...register("username")}
                        variant="outlined"
                        label="Tên đăng nhập"
                        fullWidth
                        autoFocus
                        sx={{ mb: 3 }}
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                    ></TextField>

                    <FormControl
                        sx={{ mb: 1 }}
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                        <OutlinedInput
                            {...register("password")}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu"
                        />
                        <FormHelperText id="component-error-text">{errors?.password?.message}</FormHelperText>
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox {...register("rememberMe")} color="primary" />}
                        label="Lưu thông tin"
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Đăng nhập</Button>
                    <Box sx={{
                        mt: 2.4,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Link variant="body2" sx={{ cursor: 'pointer' }}>Quên mật khẩu?</Link>
                        <Link variant="body2" sx={{ cursor: 'pointer' }}>Bạn chưa có tài khoản? Tạo mới</Link>
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

export default LoginForm;