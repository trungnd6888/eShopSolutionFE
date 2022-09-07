import { Container, Typography } from '@mui/material';
import React from 'react';
import CustomerTable from '../../components/CustomerTable/CustomerTable';

Customer.propTypes = {

};

function Customer(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách khách hàng
            </Typography>
            <CustomerTable />
        </Container>
    );
}

export default Customer; 