import React from 'react';
import { login } from '../../authSlice';
import LoginForm from '../LoginForm/LoginForm';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { open } from '../../snackbarSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const actionResult = await dispatch(action);
      const user = unwrapResult(actionResult);
      if (!user) return;

      const actionSnackbar = open({
        status: true,
        message: 'Đăng nhập thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      console.log('Login is success');
      navigate('/dashboard/dashboard');
    } catch (error) {
      let message;
      switch (error.message) {
        case 'Username is locked':
          message = 'Tài khoản bị khóa do đăng nhập quá số lần quy định';
          break;
        case 'Username or password invalid':
          message = 'Sai tên đăng nhập hoặc mật khẩu';
          break;
        default:
          message = 'Đăng nhập thất bại. Kiểm tra kết nối mạng';
      }

      const actionSnackbar = open({
        status: true,
        message: [message],
        type: 'error',
      });
      dispatch(actionSnackbar);
      console.log('FAILED TO HANDLE SUBMIT: ', error.message);
    }
  };

  return <LoginForm onSubmit={handleSubmit} />;
}

export default Login;
