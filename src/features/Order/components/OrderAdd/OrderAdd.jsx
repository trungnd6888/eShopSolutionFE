import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
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

OrderAdd.propTypes = {
  order: PropTypes.object,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  statusList: PropTypes.array,
};

OrderAdd.defaultValues = {
  order: null,
  open: false,
  onSubmit: null,
  onClose: null,
  statusList: [],
};

function OrderAdd({ onClose, onSubmit, open, order, statusList }) {
  const isUpdate = Boolean(order) || false;
  const initialValues = {
    code: '',
    name: '',
    email: '',
    address: '',
    tel: '',
    status: null,
  };
  const resetValues = {
    code: isUpdate ? order.code : '',
    name: isUpdate ? order.name : '',
    email: isUpdate ? order.email : '',
    address: isUpdate ? order.address : '',
    tel: isUpdate ? order.tel : '',
    status: isUpdate ? statusList?.find((x) => x.id === order.statusId) || null : null,
  };

  const schema = yup.object().shape({
    code: yup.string().required('Vui lòng nhập mã đơn hàng'),
    name: yup.string().required('Vui lòng nhập tên khách hàng'),
    email: yup.string().email('Vui lòng nhập đúng định dạng email'),
    address: yup.string(),
    tel: yup.string().required('Vui lòng nhập số điện thoại'),
    status: yup.object().nullable().required('Vui lòng chọn trạng thái'),
  });

  const { handleSubmit, control, reset, formState, resetField, setValue, register } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') return;
    if (onClose) onClose();

    handleFormReset(initialValues);
  };

  const handleFormSubmit = async (values) => {
    if (onSubmit)
      await onSubmit(values, () => {
        handleFormReset(initialValues);
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
  };

  useEffect(() => {
    handleFormReset(resetValues);
  }, [order]);

  return (
    <CustomizeDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      disableEscapeKeyDown
    >
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <CustomizeDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isUpdate ? 'Cập nhật' : 'Thêm mới'}
        </CustomizeDialogTitle>
        <DialogContent>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="code"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="code"
                      label="Mã đơn hàng *"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="name"
                      label="Tên khách hàng *"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="tel"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="tel"
                      label="Điện thoại *"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="email"
                      label="Email"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="address"
                      label="Địa chỉ"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Autocomplete
                      name={name}
                      value={value}
                      onChange={(event, data) => {
                        onChange(data);
                      }}
                      size="small"
                      id="status"
                      options={statusList}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Trạng thái *"
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button type="submit" size="small" variant="contained">
            Lưu
          </Button>
          <Button size="small" variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Box>
    </CustomizeDialog>
  );
}

export default OrderAdd;
