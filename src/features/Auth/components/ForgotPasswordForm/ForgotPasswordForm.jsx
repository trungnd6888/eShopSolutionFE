import { yupResolver } from '@hookform/resolvers/yup';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Avatar, Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

ForgotPasswordForm.propTypes = {
    onSubmit: PropTypes.func,
    onSnackbar: PropTypes.func
};

ForgotPasswordForm.defaultValues = {
    onSubmit: null,
    onSnackbar: null
};

function ForgotPasswordForm({ onSubmit }) {
    const schema = yup.object().shape({
        email: yup.string().required("Vui lòng điền email").email("Vui lòng điền đúng định dạng email"),
    });

    const form = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;
    const { errors, isSubmitting } = formState;
    const handleSubmitForm = async (values) => {
        if (onSubmit) await onSubmit(values);
    };

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
                    Nhập email của bạn để nhận mã xác nhận lấy lại mật khẩu
                </Typography>
                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(handleSubmitForm)}>
                    <TextField
                        {...register("email")}
                        variant="outlined"
                        label="Email"
                        fullWidth
                        autoFocus
                        sx={{ mb: 1 }}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    ></TextField>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Lấy lại mật khẩu</Button>
                    <Box sx={{
                        mt: 2.4,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Link component={NavLink} to='/login' variant="body2" >Quay lại đăng nhập</Link>
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isSubmitting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container >
    );
}

export default ForgotPasswordForm;