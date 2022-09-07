import { yupResolver } from '@hookform/resolvers/yup';
import LockResetIcon from '@mui/icons-material/LockReset';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import { PropTypes } from 'prop-types';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func,
    onSnackbar: PropTypes.func,
};

ResetPasswordForm.defaultValues = {
    onSubmit: null,
    onSnackbar: null,
};

function ResetPasswordForm({ onSubmit }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const location = useLocation();
    const params = queryString.parse(location.search);

    const schema = yup.object().shape({
        password: yup
            .string()
            .required("Vui lòng điền mật khẩu")
            .matches('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6,}$', 'Mật khẩu phải ít nhất 6 ký tự (bao gồm ' +
                'ít nhất một số, một chữ hoa, một chữ thường và một ký tự đặc biệt)'),
        confirmPassword: yup
            .string()
            .required('Vui lòng điền xác nhận mật khẩu')
            .oneOf([yup.ref('password')], 'Mật khẩu xác nhận chưa khớp'),
    });

    const form = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;
    const { errors, isSubmitting } = formState;
    const handleSubmitForm = async (values) => {
        if (onSubmit) await onSubmit(values, email, params?.Token);
    };

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(x => !x);
    }

    useEffect(() => {
        setEmail(params?.Email);
    }, []);

    return (
        < Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 9
            }} >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                    <LockResetIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mt: 1 }} >
                    Quên mật khẩu
                </Typography>
                <Typography component="h1" variant="caption" sx={{ mt: 1 }} >
                    Vui lòng điền mật khẩu mới
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(handleSubmitForm)} >
                    <FormControl
                        sx={{ mb: 3 }}
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
                    <FormControl
                        sx={{ mb: 1 }}
                        variant="outlined"
                        fullWidth
                        error={!!errors.confirmPassword}
                    >
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Nhập lại mật khẩu</InputLabel>
                        <OutlinedInput
                            {...register("confirmPassword")}
                            id="outlined-adornment-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={toggleShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Nhập lại mật khẩu"
                        />
                        <FormHelperText id="component-error-text">{errors?.confirmPassword?.message}</FormHelperText>
                    </FormControl>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Cập nhật mật khẩu</Button>
                </Box>
            </Box>
            <Box textAlign="center" sx={{ mt: 8 }}>
                <Typography variant="body2" color="text.secondary">
                    Copyright ©&nbsp;
                    <Link color="inherit" sx={{ cursor: 'pointer' }}>E Shop</Link>
                    &nbsp;2022.
                </Typography>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isSubmitting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container >
    );
}

export default ResetPasswordForm;