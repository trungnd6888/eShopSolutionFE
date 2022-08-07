import { Avatar, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';

AppWidgetSummary.propTypes = {
    name: PropTypes.string,
    quantity: PropTypes.number,
    icon: PropTypes.object,
    color: PropTypes.string,
};

AppWidgetSummary.default = {
    name: '',
    quantity: 0,
    icon: null,
    color: '',
};

const CustomizePaper = styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 30,
});

function AppWidgetSummary({ name, quantity, icon, color }) {
    const CustomizeAvatar = styled(Avatar)(({ theme }) => ({
        padding: 32,
        marginBottom: 24,
        backgroundColor: theme.palette[color].main,
    }));

    return (
        <CustomizePaper >
            <CustomizeAvatar>{icon}</CustomizeAvatar>
            <Typography variant="h4" sx={{ mb: 1 }}>{quantity}</Typography>
            <Typography variant="subtitle2">{name}</Typography>
        </CustomizePaper>
    );
}

export default AppWidgetSummary;