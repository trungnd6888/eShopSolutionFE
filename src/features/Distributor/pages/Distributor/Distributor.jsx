import { Container, Typography } from '@mui/material';
import React from 'react';
import DistributorTable from '../../components/DistributorTable/DistributorTable';

Distributor.propTypes = {

};

function Distributor(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách nhà phân phối
            </Typography>
            <DistributorTable />
        </Container>
    );
}

export default Distributor; 