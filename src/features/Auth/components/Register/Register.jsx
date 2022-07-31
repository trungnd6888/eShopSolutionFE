import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { open } from '../../snackbarSlice'
import { unwrapResult } from '@reduxjs/toolkit';

Register.propTypes = {

};

function Register(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const action = register(values);
            const actionResult = await dispatch(action);
            const user = unwrapResult(actionResult);
            if (!user) return;

            const actionSnackbar = open({
                status: true,
                message: 'Đăng ký thành công',
                type: 'success',
            });

            dispatch(actionSnackbar);
            navigate('/login');
            console.log('Register is success');
        } catch (error) {
            const actionSnackbar = open({
                status: true,
                message: 'Tên đăng nhập đã có người sử dụng',
                type: 'error',
            });

            dispatch(actionSnackbar);
            console.log('Failed to register', error);
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;