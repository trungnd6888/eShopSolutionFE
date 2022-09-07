import { Container, Typography } from '@mui/material';
import React from 'react';
import UserTable from '../../components/UserTable/UserTable';

User.propTypes = {

};

function User(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách người dùng
            </Typography>
            <UserTable />
        </Container>
    );
}

export default User; 