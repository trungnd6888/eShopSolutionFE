import { Container, Typography } from '@mui/material';
import React from 'react';
import CategoryTable from '../../components/CategoryTable/CategoryTable';

Category.propTypes = {

};

function Category(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách bộ sưu tập
            </Typography>
            <CategoryTable />
        </Container>
    );
}

export default Category; 