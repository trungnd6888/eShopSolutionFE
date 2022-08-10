import { Typography } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';

ResetPasswordSuccess.propTypes = {

};

function ResetPasswordSuccess(props) {
    return (
        <Typography variant='body2' sx={{ textAlign: 'center', lineHeight: '100vh' }}>
            Cập nhật mật khẩu thành công. <Link href='/login' variant='body2'>Quay lại trang đăng nhập ?</Link>
        </Typography>
    );
}

export default ResetPasswordSuccess;