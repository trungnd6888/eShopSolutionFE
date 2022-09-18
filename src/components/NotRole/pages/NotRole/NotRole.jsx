import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

NotRole.propTypes = {

};

function NotRole(props) {
    return (
        <Box sx={{
            display: 'flex-container',
            justifyContent: 'center',
            height: '100vh',
            alignItems: 'center',
            textAlign: 'center',
            mt: -10,
            mr: 3,
            ml: 3,
        }}>
            <Typography variant='body2' >
                Bạn không có quyền truy cập chức năng này. <Link component={NavLink} to='/dashboard/dashboard' variant='body2'>Quay lại trang tổng quan ?</Link>
            </Typography>
        </Box >
    );
}

export default NotRole; 