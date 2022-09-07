import { Container, Typography } from '@mui/material';
import React from 'react';
import NewsTable from '../../components/NewsTable/NewsTable';

News.propTypes = {

};

function News(props) {
    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách tin tức
            </Typography>
            <NewsTable />
        </Container>
    );
}

export default News; 