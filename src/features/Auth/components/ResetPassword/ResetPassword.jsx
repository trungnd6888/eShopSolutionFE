import React from 'react';
import userApi from '../../../../api/UserApi';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';
import { useDispatch } from 'react-redux';
import { open } from '../../snackbarSlice';
import { useNavigate } from 'react-router-dom';

ResetPassword.propTypes = {

};

function ResetPassword(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values, email, token) => {
        try {
            const data = { ...values, email };
            const config = { params: { token } };
            console.log('data: ', data);
            console.log('config: ', config);
            await userApi.resetPassword(data, config);
            const actionSnackbar = open({
                status: true,
                message: 'Cập nhật mật khẩu thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            console.log('Reset password success');
            navigate('/login');
        } catch (error) {
            const actionSnackbar = open({
                status: true,
                message: 'Cập nhật mật khẩu không thành công',
                type: 'error',
            });
            dispatch(actionSnackbar);

            console.log('Fail to Reset password', error);
        }
    };

    return (
        <ResetPasswordForm onSubmit={handleSubmit} />
    );
}

export default ResetPassword;