import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { Link } from '@mui/material';
import * as yup from 'yup';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  onSnackbar: PropTypes.func,
};

LoginForm.defaultValues = {
  onSubmit: null,
  onSnackbar: null,
};

function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required('Vui lòng điền tên đăng nhập'),
    password: yup.string().required('Vui lòng điền mật khẩu'),
    // rememberMe: yup.bool()
  });

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      // rememberMe: false
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          Đăng nhập
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(handleSubmitForm)}>
          <TextField
            {...register('username')}
            variant="outlined"
            label="Tên đăng nhập"
            fullWidth
            autoFocus
            sx={{ mb: 3 }}
            error={!!errors.username}
            helperText={errors?.username?.message}
          ></TextField>

          <FormControl sx={{ mb: 1 }} variant="outlined" fullWidth error={!!errors.password}>
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
          {/* 
                    <FormControlLabel
                        control={<Checkbox {...register("rememberMe")} color="primary" />}
                        label="Lưu thông tin"
                    /> */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Đăng nhập
          </Button>
          <Box
            sx={{
              mt: 2.4,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link variant="body2" component={NavLink} to="/forgotpassword">
              Quên mật khẩu?
            </Link>
            <Link variant="body2" component={NavLink} to="/register">
              Bạn chưa có tài khoản? Tạo mới
            </Link>
          </Box>
        </Box>
      </Box>
      <Box textAlign="center" sx={{ mt: 8 }}>
        <Typography variant="body2" color="text.secondary">
          Copyright ©&nbsp;
          <Link to="#" color="inherit">
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

export default LoginForm;
