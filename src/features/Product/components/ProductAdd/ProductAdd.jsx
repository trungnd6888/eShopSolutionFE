import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import * as yup from 'yup';
import CustomizeFileUpload from '../../../../components/CustomizeFileUpload/CustomizeFileUpload';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

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

ProductAdd.propTypes = {
    product: PropTypes.object,
    distributorList: PropTypes.array,
    categoryList: PropTypes.array,
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};

ProductAdd.defaultValues = {
    product: null,
    distributorList: [],
    categoryList: [],
    open: false,
    onSubmit: null,
    onClose: null,
};

function ProductAdd({ onClose, onSubmit, open, categoryList, distributorList, product }) {
    const isUpdate = Boolean(product) || false;
    const initialValues = {
        code: '',
        name: '',
        price: '',
        detail: '',
        categories: [],
        distributors: [],
        isApproved: false,
        isBestSale: false,
        isNew: false,
        thumbnailImages0: [],
        thumbnailImages1: [],
        thumbnailImages2: [],
        thumbnailImages3: [],
        thumbnailImages4: [],
        thumbnailImages5: [],
        thumbnailImages6: [],
        thumbnailImages7: [],
    };
    const resetValues = {
        code: isUpdate ? product.code : '',
        name: isUpdate ? product.name : '',
        price: isUpdate ? product.price : '',
        detail: isUpdate ? product.detail : '',
        isApproved: isUpdate ? product.isApproved : false,
        isBestSale: isUpdate ? product.isBestSale : false,
        isNew: isUpdate ? product.isNew : false,
        categories: isUpdate ? categoryList.filter(x => product.categories.includes(x.id)) : [],
        distributors: isUpdate ? distributorList.filter(x => product.distributors.includes(x.id)) : [],
        thumbnailImages0: [],
        thumbnailImages1: [],
        thumbnailImages2: [],
        thumbnailImages3: [],
        thumbnailImages4: [],
        thumbnailImages5: [],
        thumbnailImages6: [],
        thumbnailImages7: [],
    };

    const schema = yup.object().shape({
        code: yup.string().required('Vui lòng nhập mã sản phẩm'),
        name: yup.string().required('Vui lòng nhập tên sản phẩm'),
        price: yup.string(),
        detail: yup.string(),
        categories: yup.array(),
        distributors: yup.array(),
        isApproved: yup.bool(),
        isBestSale: yup.bool(),
        isNew: yup.bool(),
    });

    const { handleSubmit, control, reset, formState, register } = useForm({
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
    }, [product]);

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
                            <Grid item xs={12} sm={6} md={6} >
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field: { name, value, onChange } }) =>
                                        <TextField
                                            name={name}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            id="code"
                                            label="Mã sản phẩm *"
                                            size="small"
                                            variant="standard"
                                            error={!!errors.code}
                                            helperText={errors?.code?.message}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
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
                                            label="Tên sản phẩm *"
                                            size="small"
                                            variant="standard"
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <Controller
                                    name="detail"
                                    control={control}
                                    render={({ field: { name, value, onChange } }) =>
                                        <TextField
                                            name={name}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            multiline
                                            rows={2}
                                            id="detail"
                                            label="Thông tin"
                                            size="small"
                                            variant="standard"
                                        />}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field: { name, onChange, value } }) =>
                                        <TextField
                                            value={value}
                                            name={name}
                                            onChange={onChange}
                                            fullWidth
                                            id="price"
                                            label="Giá"
                                            size="small"
                                            variant="standard"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormGroup sx={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <FormControlLabel
                                        control={
                                            <Controller
                                                name="isApproved"
                                                control={control}
                                                render={({ field: { name, value, onChange } }) =>
                                                    <Checkbox
                                                        name={name}
                                                        onChange={onChange}
                                                        checked={value}
                                                        size="small"
                                                    />}
                                            />
                                        }
                                        label="Hiển thị"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Controller
                                                name="isBestSale"
                                                control={control}
                                                render={({ field: { name, value, onChange } }) =>
                                                    <Checkbox
                                                        name={name}
                                                        onChange={onChange}
                                                        checked={value}
                                                        size="small"
                                                    />}
                                            />
                                        }
                                        label="Bán chạy"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Controller
                                                name="isNew"
                                                control={control}
                                                render={({ field: { name, value, onChange } }) =>
                                                    <Checkbox
                                                        name={name}
                                                        onChange={onChange}
                                                        checked={value}
                                                        size="small"
                                                    />}
                                            />
                                        }
                                        label="Mới"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography sx={{ mb: 2 }} > Hình ảnh</Typography>
                                <Stack
                                    direction="row"
                                    sx={{ flexWrap: 'wrap' }}
                                >
                                    <CustomizeFileUpload title="* Ảnh bìa"  {...register("thumbnailImages0")} />
                                    <CustomizeFileUpload title="Ảnh 1"  {...register("thumbnailImages1")} />
                                    <CustomizeFileUpload title="Ảnh 2"  {...register("thumbnailImages2")} />
                                    <CustomizeFileUpload title="Ảnh 3"  {...register("thumbnailImages3")} />
                                    <CustomizeFileUpload title="Ảnh 4"  {...register("thumbnailImages4")} />
                                    <CustomizeFileUpload title="Ảnh 5"  {...register("thumbnailImages5")} />
                                    <CustomizeFileUpload title="Ảnh 6"  {...register("thumbnailImages6")} />
                                    <CustomizeFileUpload title="Ảnh 7"  {...register("thumbnailImages7")} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Controller
                                    name="categories"
                                    control={control}
                                    render={({ field: { name, onChange, value } }) =>
                                        <Autocomplete
                                            name={name}
                                            value={value}
                                            onChange={(event, data) => {
                                                onChange(data)
                                            }}
                                            multiple
                                            size="small"
                                            id="categories"
                                            options={categoryList}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Bộ sưu tập"
                                                />
                                            )}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Controller
                                    name="distributors"
                                    control={control}
                                    render={({ field: { name, onChange, value } }) =>
                                        <Autocomplete
                                            name={name}
                                            value={value}
                                            onChange={(event, data) => {
                                                onChange(data)
                                            }}
                                            multiple
                                            size="small"
                                            id="distributors"
                                            options={distributorList}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Nhà phân  phối"
                                                />
                                            )}
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

export default ProductAdd;