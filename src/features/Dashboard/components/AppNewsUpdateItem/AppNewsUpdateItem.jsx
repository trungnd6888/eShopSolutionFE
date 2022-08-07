import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, styled, Typography } from '@mui/material';

AppNewsUpdateItem.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.string,
};

AppNewsUpdateItem.defaultValues = {
    title: '',
    image: '',
    description: '',
    time: '',
};

const CustomizeBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: 24,
    paddingTop: 8,
    paddingBottom: 8,
});

const CustomizeAvatar = styled(Avatar)({
    variant: 'square',
    borderRadius: 8,
    width: 45,
    height: 45,
});

function AppNewsUpdateItem({ title, image, description, time }) {
    return (
        <CustomizeBox >
            <CustomizeAvatar src={image} />
            <Box sx={{ flex: 4, pl: 3, minWidth: 300 }}>
                <Typography variant="subtitle2" >{title}</Typography>
                <Typography variant="body2" >{description}</Typography>
            </Box>
            <Typography variant="caption" sx={{ flex: 1, minWidth: 120 }}>{time}</Typography>
        </CustomizeBox >
    );
}

export default AppNewsUpdateItem;