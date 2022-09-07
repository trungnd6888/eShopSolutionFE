import { Container, Typography } from '@mui/material';
import React from 'react';
import OrderTable from '../../components/OrderTable/OrderTable';

Order.propTypes = {

};

function Order(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách đơn hàng
            </Typography>
            <OrderTable />
        </Container>
    );
}

export default Order; 