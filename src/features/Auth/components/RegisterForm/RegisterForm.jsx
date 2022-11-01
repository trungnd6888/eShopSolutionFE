import { yupResolver } from '@hookform/resolvers/yup';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  onSnackbar: PropTypes.func,
};

RegisterForm.defaultValues = {
  onSubmit: null,
  onSnackbar: null,
};

function RegisterForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = yup.object().shape({
    fullName: yup.string().required('Vui lòng điền họ tên'),
    email: yup.string().required('Vui lòng điền email').email('Vui lòng điền đúng định dạng email'),
    username: yup.string().required('Vui lòng điền tên đăng nhập'),
    password: yup
      .string()
      .required('Vui lòng điền mật khẩu')
      .matches(
        '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z]).{6,}$',
        'Mật khẩu phải ít nhất 6 ký tự (bao gồm ' +
          'ít nhất một số, một chữ hoa, một chữ thường và một ký tự đặc biệt)'
      ),
    confirmPassword: yup
      .string()
      .required('Vui lòng điền xác nhận mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận chưa khớp'),
    rememberMe: yup.bool(),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  const handleSubmitForm = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((x) => !x);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 9,
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          Đăng ký
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(handleSubmitForm)}>
          <TextField
            {...register('fullName')}
            variant="outlined"
            label="Họ tên"
            fullWidth
            autoFocus
            sx={{ mb: 3 }}
            error={!!errors.fullName}
            helperText={errors?.fullName?.message}
          ></TextField>

          <TextField
            {...register('username')}
            variant="outlined"
            label="Tên đăng nhập"
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.username}
            helperText={errors?.username?.message}
          ></TextField>

          <TextField
            {...register('email')}
            variant="outlined"
            label="Email"
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.email}
            helperText={errors?.email?.message}
          ></TextField>

          <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth error={!!errors.password}>
            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
            <OutlinedInput
              {...register('password')}
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
          <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth error={!!errors.confirmPassword}>
            <InputLabel htmlFor="outlined-adornment-confirm-password">Nhập lại mật khẩu</InputLabel>
            <OutlinedInput
              {...register('confirmPassword')}
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
            <FormHelperText id="component-error-text">
              {errors?.confirmPassword?.message}
            </FormHelperText>
          </FormControl>

          <TextField
            {...register('phoneNumber')}
            variant="outlined"
            label="Điện thoại"
            fullWidth
            sx={{ mb: 1 }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          ></TextField>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Đăng ký
          </Button>
          <Box
            sx={{
              mt: 2.4,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link component={NavLink} to="/login" variant="body2">
              Bạn đã có tài khoản? Đăng nhập
            </Link>
          </Box>
        </Box>
      </Box>
      <Box textAlign="center" sx={{ mt: 8 }}>
        <Typography variant="body2" color="text.secondary">
          Copyright ©&nbsp;
          <Link color="inherit" sx={{ cursor: 'pointer' }}>
            E Shop
          </Link>
          &nbsp;2022.
        </Typography>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default RegisterForm;
