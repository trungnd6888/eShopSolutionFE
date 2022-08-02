import React from 'react';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

ResetPassword.propTypes = {

};

function ResetPassword(props) {
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <ResetPasswordForm onSubmit={handleSubmit} />
    );
}

export default ResetPassword;