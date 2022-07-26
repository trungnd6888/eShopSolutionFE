import React from 'react';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm/LoginForm';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'

function Login() {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        // console.log('form values: ', values)
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('Login is success');
        } catch (error) {
            console.log('Failed to login', error);
        }
    };

    return (
        <LoginForm onSubmit={handleSubmit} />
    );
}

export default Login;