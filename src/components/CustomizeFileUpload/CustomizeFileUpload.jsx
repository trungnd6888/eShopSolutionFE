import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { STORAGE_IMAGE } from '../../constants/common';
import { PropTypes } from 'prop-types';
import React, { useState, forwardRef } from 'react';


const CustomizeBox = styled(Box)({
    display: "flex",
    flexDirection: 'column',
    marginRight: 16,
    marginBottom: 16,
    width: 68,
});

const CustomizeInput = styled('input')({
    display: 'none'
});

const CustomizeIconButton = styled(IconButton)(({ theme }) => ({
    padding: 0,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    right: -5,
    top: -5,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
}));

const CustomizeFileUpload = forwardRef(({ title, name, onChange, onBlur }, ref) => {
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e) => {
        if (onChange) onChange(e);

        const url = URL.createObjectURL(e.target.files[0]);
        setImageUrl(url);
    };

    const handleClose = () => {
        setImageUrl('');
    };

    const CustomizeLabel = styled('label')`
    background-image: url(${imageUrl || STORAGE_IMAGE.PRODUCT_THUMBNAI});
    background-repeat: no-repeat;
    background-size: cover; 
    border-radius: 3px;
    position: relative;
    width: 100%;
    height: 68px;
`;

    return (
        <CustomizeBox>
            < CustomizeLabel >
                <CustomizeInput
                    type="file"
                    onChange={handleChange}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                />
                <CustomizeIconButton onClick={handleClose} >
                    <CloseIcon sx={{ width: 18, height: 18 }} />
                </CustomizeIconButton >
            </CustomizeLabel>
            <Typography sx={{ mt: 1, textAlign: 'center', fontSize: 12 }}>{title}</Typography>
        </ CustomizeBox >
    );
});

CustomizeFileUpload.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

CustomizeFileUpload.defaultValues = {
    title: '',
    name: '',
    onChange: null,
    onBlur: null,
};


export default CustomizeFileUpload;