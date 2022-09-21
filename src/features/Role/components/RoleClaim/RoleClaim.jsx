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
    const rows = [
        {
            id: 1,
            nameControl: 'product',
            label: 'Sản phẩm',
            groupId: 1,
        },
        {
            id: 2,
            nameControl: 'category',
            label: 'Bộ sưu tập',
            groupId: 1,
        },
        {
            id: 3,
            nameControl: 'news',
            label: 'Tin tức',
            groupId: 1,
        },
        {
            id: 4,
            nameControl: 'distributor',
            label: 'Nhà phân phối',
            groupId: 1,
        },
        {
            id: 5,
            nameControl: 'order',
            label: 'Đơn hàng',
            groupId: 2,
        },
        {
            id: 6,
            nameControl: 'customer',
            label: 'Khách hàng',
            groupId: 2,
        },
        {
            id: 7,
            nameControl: 'permission',
            label: 'Vai trò',
            groupId: 3,
        },
        {
            id: 8,
            nameControl: 'user',
            label: 'Người dùng',
            groupId: 3,
        },
    ]

    const groups = [
        {
            id: 1,
            name: 'Quản lý danh mục ',
        },
        {
            id: 2,
            name: 'Quản lý bán hàng',
        },
        {
            id: 3,
            name: 'Quản lý hệ thống',
        },
    ]

    const isUpdate = Boolean(roleClaimList) || false;

    const initialValues = {};
    rows.forEach(x => {
        initialValues[x.nameControl] = false;
        initialValues[`${x.nameControl}View`] = false;
        initialValues[`${x.nameControl}Create`] = false;
        initialValues[`${x.nameControl}Update`] = false;
        initialValues[`${x.nameControl}Remove`] = false;
    })

    const setResetValue = (claimType, claimValue) => {
        return isUpdate
            ? !!roleClaimList.find(x => (x.claimType === claimType && x.claimValue === claimValue))
            : false
    }

    const resetValues = {}
    rows.forEach(x => {
        resetValues[`${x.nameControl}View`] = setResetValue(x.nameControl, `${x.nameControl}.view`);
        resetValues[`${x.nameControl}Create`] = setResetValue(x.nameControl, `${x.nameControl}.create`);
        resetValues[`${x.nameControl}Update`] = setResetValue(x.nameControl, `${x.nameControl}.update`);
        resetValues[`${x.nameControl}Remove`] = setResetValue(x.nameControl, `${x.nameControl}.remove`);
        resetValues[x.nameControl] = setResetValue(x.nameControl, `${x.nameControl}.view`)
            && setResetValue(x.nameControl, `${x.nameControl}.create`)
            && setResetValue(x.nameControl, `${x.nameControl}.update`)
            && setResetValue(x.nameControl, `${x.nameControl}.remove`)
    });

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

        setTimeout(() => {
            handleFormReset(initialValues);
        }, 500);
    };

    const handleFormSubmit = async (values) => {
        if (onSubmit) await onSubmit(values, () => { handleFormReset(initialValues) });
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
                            {groups.map(x =>
                            (<Grid container item key={x.id + x.name} >
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant="button">{x.name}</Typography>
                                </Grid>

                                {rows.map(y =>
                                    (y.groupId === x.id) &&
                                    < Grid item xs={12} sm={6} md={4} key={y.id + y.nameControl}>
                                        <IndeterminateCheckbox
                                            control={control}
                                            nameControl={y.nameControl}
                                            label={y.label}
                                            onCheckAllClick={handleCheckAllClick}
                                            onCheckItemClick={handleCheckItemClick}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            ))}
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