import { Container, Typography } from '@mui/material';
import React from 'react';
import ProductTable from '../../components/ProductTable/ProductTable';

Product.propTypes = {

};

function Product(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách sản phẩm
            </Typography>
            <ProductTable />
        </Container>
    );
}

export default Product; 