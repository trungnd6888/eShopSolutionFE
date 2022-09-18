import React from 'react';
import authApi from '../../../../api/authApi';
import { open } from '../../snackbarSlice';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm';
import { useDispatch } from 'react-redux';

ForgotPassword.propTypes = {

};

function ForgotPassword(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            await authApi.forgotPassword(values);

            console.log('Forgot password success !');
            const actionSnackbar = open({
                status: true,
                message: 'Thành công. Vui lòng truy cập email để tiếp tục',
                type: 'success',
            });
            dispatch(actionSnackbar);
        } catch (error) {
            console.log('error: ', error?.response);
            const actionSnackbar = open({
                status: true,
                message: error?.response?.data?.error,
                type: 'error',
            });
            dispatch(actionSnackbar);
        }
    };

    return (
        <ForgotPasswordForm onSubmit={handleSubmit} />
    );
}

export default ForgotPassword;