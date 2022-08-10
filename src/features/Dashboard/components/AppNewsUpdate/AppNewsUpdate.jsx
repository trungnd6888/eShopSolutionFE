import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import AppNewsUpdateItem from '../AppNewsUpdateItem/AppNewsUpdateItem';

AppNewsUpdate.propTypes = {
    list: PropTypes.array,
};

AppNewsUpdate.defaultValues = {
    list: [],
};

function AppNewsUpdate({ list }) {
    return (
        <Paper sx={{ pt: 2, pb: 2 }}>
            <Box sx={{ overflowX: 'auto' }}>
                {list.map((item, index) => (
                    <AppNewsUpdateItem key={item.title + index} title={item.title} time={item.time}
                        description={item.description} image={item.image}
                    />
                ))}
            </Box>

        </Paper >
    );
}

export default AppNewsUpdate;