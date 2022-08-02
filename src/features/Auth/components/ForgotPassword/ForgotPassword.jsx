import React from 'react';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm';

ForgotPassword.propTypes = {

};

const handleSubmit = (values) => {
    console.log(values);
};

function ForgotPassword(props) {
    return (
        <ForgotPasswordForm onSubmit={handleSubmit} />
    );
}

export default ForgotPassword;