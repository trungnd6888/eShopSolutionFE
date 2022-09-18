import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import IndeterminateCheckbox from '../../../../components/IndeterminateCheckbox/IndeterminateCheckbox';


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

RoleClaim.propTypes = {
    roleClaimList: PropTypes.array,
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};

RoleClaim.defaultValues = {
    roleClaimList: [],
    open: false,
    onSubmit: null,
    onClose: null,
};

function RoleClaim({ onClose, onSubmit, open, roleClaimList }) {
    const isUpdate = Boolean(roleClaimList) || false;
    const initialValues = {
        product: false,
        productView: false,
        productCreate: false,
        productUpdate: false,
        productRemove: false,

        category: false,
        categoryView: false,
        categoryCreate: false,
        categoryUpdate: false,
        categoryRemove: false,

        news: false,
        newsView: false,
        newsCreate: false,
        newsUpdate: false,
        newsRemove: false,

        distributor: false,
        distributorView: false,
        distributorCreate: false,
        distributorUpdate: false,
        distributorRemove: false,

        user: false,
        userView: false,
        userCreate: false,
        userUpdate: false,
        userRemove: false,

        order: false,
        orderView: false,
        orderCreate: false,
        orderUpdate: false,
        orderRemove: false,

        customer: false,
        customerView: false,
        customerCreate: false,
        customerUpdate: false,
        customerRemove: false,

        role: false,
        roleView: false,
        roleCreate: false,
        roleUpdate: false,
        roleRemove: false,
    };

    const setResetValue = (claimType, claimValue) => {
        return isUpdate
            ? !!roleClaimList.find(x => (x.claimType === claimType && x.claimValue === claimValue))
            : false
    }

    const resetValues = {
        productView: setResetValue('product', 'product.view'),
        productCreate: setResetValue('product', 'product.create'),
        productUpdate: setResetValue('product', 'product.update'),
        productRemove: setResetValue('product', 'product.remove'),
        product: setResetValue('product', 'product.view')
            && setResetValue('product', 'product.create')
            && setResetValue('product', 'product.update')
            && setResetValue('product', 'product.remove'),

        categoryView: setResetValue('category', 'category.view'),
        categoryCreate: setResetValue('category', 'category.create'),
        categoryUpdate: setResetValue('category', 'category.update'),
        categoryRemove: setResetValue('category', 'category.remove'),
        category: setResetValue('category', 'category.view')
            && setResetValue('category', 'category.create')
            && setResetValue('category', 'category.update')
            && setResetValue('category', 'category.remove'),

        distributorView: setResetValue('distributor', 'distributor.view'),
        distributorCreate: setResetValue('distributor', 'distributor.create'),
        distributorUpdate: setResetValue('distributor', 'distributor.update'),
        distributorRemove: setResetValue('distributor', 'distributor.remove'),
        distributor: setResetValue('distributor', 'distributor.view')
            && setResetValue('distributor', 'distributor.create')
            && setResetValue('distributor', 'distributor.update')
            && setResetValue('distributor', 'distributor.remove'),

        userView: setResetValue('user', 'user.view'),
        userCreate: setResetValue('user', 'user.create'),
        userUpdate: setResetValue('user', 'user.update'),
        userRemove: setResetValue('user', 'user.remove'),
        user: setResetValue('user', 'user.view')
            && setResetValue('user', 'user.create')
            && setResetValue('user', 'user.update')
            && setResetValue('user', 'user.remove'),

        customerView: setResetValue('customer', 'customer.view'),
        customerCreate: setResetValue('customer', 'customer.create'),
        customerUpdate: setResetValue('customer', 'customer.update'),
        customerRemove: setResetValue('customer', 'customer.remove'),
        customer: setResetValue('customer', 'customer.view')
            && setResetValue('customer', 'customer.create')
            && setResetValue('customer', 'customer.update')
            && setResetValue('customer', 'customer.remove'),

        orderView: setResetValue('order', 'order.view'),
        orderCreate: setResetValue('order', 'order.create'),
        orderUpdate: setResetValue('order', 'order.update'),
        orderRemove: setResetValue('order', 'order.remove'),
        order: setResetValue('order', 'order.view')
            && setResetValue('order', 'order.create')
            && setResetValue('order', 'order.update')
            && setResetValue('order', 'order.remove'),

        newsView: setResetValue('news', 'news.view'),
        newsCreate: setResetValue('news', 'news.create'),
        newsUpdate: setResetValue('news', 'news.update'),
        newsRemove: setResetValue('news', 'news.remove'),
        news: setResetValue('news', 'news.view')
            && setResetValue('news', 'news.create')
            && setResetValue('news', 'news.update')
            && setResetValue('news', 'news.remove'),

        roleView: setResetValue('role', 'role.view'),
        roleCreate: setResetValue('role', 'role.create'),
        roleUpdate: setResetValue('role', 'role.update'),
        roleRemove: setResetValue('role', 'role.remove'),
        role: setResetValue('role', 'role.view')
            && setResetValue('role', 'role.create')
            && setResetValue('role', 'role.update')
            && setResetValue('role', 'role.remove'),
    };

    const schema = yup.object().shape({
        productView: yup.boolean(),
    });

    const { handleSubmit, control, reset, formState, getValues, setValue } = useForm({
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
        console.log('values: ', values);
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

    const handleCheckAllClick = (value, name) => {
        setValue(`${name}`, value);
        setValue(`${name}Create`, value);
        setValue(`${name}View`, value);
        setValue(`${name}Update`, value);
        setValue(`${name}Remove`, value);
    };

    const handleCheckItemClick = (value, name, nameControl) => {
        const [viewName, viewValue] = [`${nameControl}View`, getValues(`${nameControl}View`)];
        const [createName, createValue] = [`${nameControl}Create`, getValues(`${nameControl}Create`)];
        const [updateName, updateValue] = [`${nameControl}Update`, getValues(`${nameControl}Update`)];
        const [removeName, removeValue] = [`${nameControl}Remove`, getValues(`${nameControl}Remove`)];

        switch (name) {
            case viewName:
                setValue(nameControl, value && createValue && updateValue && removeValue);
                break;
            case createName:
                setValue(nameControl, viewValue && value && updateValue && removeValue);
                break;
            case updateName:
                setValue(nameControl, viewValue && createValue && value && removeValue);
                break;
            case removeName:
                setValue(nameControl, viewValue && createValue && updateValue && value);
                break;
        }
    };

    useEffect(() => {
        handleFormReset(resetValues);
    }, [roleClaimList]);

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
                    Phân quyền
                </CustomizeDialogTitle>
                <DialogContent>
                    <Container >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} >
                                <Typography variant="button">Quản lý danh mục</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="product"
                                    label="Sản phẩm"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="category"
                                    label="Bộ sưu tập"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="news"
                                    label="Tin tức"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="distributor"
                                    label="Nhà phân phối"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='button'>Quản lý bán hàng</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="order"
                                    label="Đơn hàng"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="customer"
                                    label="Khách hàng"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='button'>Quản lý hệ thống</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="role"
                                    label="Vai trò"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <IndeterminateCheckbox
                                    control={control}
                                    nameControl="user"
                                    label="Người dùng"
                                    onCheckAllClick={handleCheckAllClick}
                                    onCheckItemClick={handleCheckItemClick}
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

export default RoleClaim;