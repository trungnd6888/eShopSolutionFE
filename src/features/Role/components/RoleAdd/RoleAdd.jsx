import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const CustomizeDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
        maxWidth: 752,
    },
}));

const CustomizeDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

CustomizeDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

RoleAdd.propTypes = {
    role: PropTypes.object,
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};

RoleAdd.defaultValues = {
    role: null,
    open: false,
    onSubmit: null,
    onClose: null,
};

function RoleAdd({ onClose, onSubmit, open, role }) {
    const isUpdate = Boolean(role) || false;
    const initialValues = {
        name: '',
        description: '',
    };
    const resetValues = {
        name: isUpdate ? role.name : '',
        description: isUpdate ? role.description : '',
    };

    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên vai trò'),
        description: yup.string(),
    });

    const { handleSubmit, control, reset, formState } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    });

    const { errors } = formState;

    const handleClose = (event, reason) => {
        if (reason === 'backdropClick') return;
        if (onClose) onClose();

        handleFormReset(initialValues);
    };

    const handleFormSubmit = async (values) => {
        if (onSubmit) await onSubmit(values, () => {
            handleFormReset(initialValues)
        });
    };

    const handleFormReset = (data) => {
        reset(data, {
            keepErrors: false,
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
        });
    }

    useEffect(() => {
        handleFormReset(resetValues);
    }, [role]);

    return (
        <CustomizeDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            disableEscapeKeyDown
        >
            <Box
                component="form"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <CustomizeDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {isUpdate ? 'Cập nhật' : 'Thêm mới'}
                </CustomizeDialogTitle>
                <DialogContent>
                    <Container >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} >
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field: { name, value, onChange } }) =>
                                        <TextField
                                            name={name}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="name"
                                            label="Tên vai trò *"
                                            size="small"
                                            variant="standard"
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field: { name, value, onChange } }) =>
                                        <TextField
                                            name={name}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            multiline
                                            rows={2}
                                            id="description"
                                            label="Mô tả"
                                            size="small"
                                            variant="standard"
                                        />}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" size="small" variant="contained" >
                        Lưu
                    </Button>
                    <Button size="small" variant="contained" onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </Box >
        </CustomizeDialog >
    );
}

export default RoleAdd;