import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomizeFileUpload from '../../../../components/CustomizeFileUpload/CustomizeFileUpload';
import { STORAGE_IMAGE } from '../../../../constants/common';

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

CustomerAdd.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

CustomerAdd.defaultValues = {
  customer: null,
  open: false,
  onSubmit: null,
  onClose: null,
};

function CustomerAdd({ onClose, onSubmit, open, customer }) {
  const isUpdate = Boolean(customer) || false;
  const initialValues = {
    name: '',
    birthday: moment(new Date('1970-01-01')).format('YYYY-MM-DD'),
    address: '',
    tel: '',
    email: '',
    inputHidden: '',
  };
  const resetValues = {
    name: isUpdate ? customer.name : '',
    birthday: isUpdate
      ? moment(customer.birthday).format('YYYY-MM-DD')
      : moment(new Date('1970-01-01')).format('YYYY-MM-DD'),
    address: isUpdate ? customer.address : '',
    tel: isUpdate ? customer.tel : '',
    email: isUpdate ? customer.email : '',
    inputHidden: isUpdate ? customer.imageUrl : '',
  };

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên khách'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh'),
    address: yup.string(),
    tel: yup.string(),
    email: yup.string().email('Vui lòng nhập đúng định dạng email'),
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

  const getUrlImage = (path) => {
    return isUpdate && path ? `https://localhost:7095${path}` : '';
  };

  const handleFileUploadClose = (fileUpload, inputHidden) => {
    resetField(fileUpload);
    setValue(inputHidden, '');
  };

  useEffect(() => {
    handleFormReset(resetValues);
  }, [customer]);

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
                  name="name"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="name"
                      label="Tên khách *"
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
                  name="birthday"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      type="date"
                      id="birthday"
                      label="Ngày sinh *"
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
                  name="tel"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="tel"
                      label="Số điện thoại"
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
                <Typography sx={{ mb: 2 }}> Hình ảnh</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                  <CustomizeFileUpload
                    initImageUrl={getUrlImage(customer?.imageUrl)}
                    defaultImageUrl={STORAGE_IMAGE.AVATAR_THUMBNAI}
                    {...register('thumbnailImage')}
                    onClose={() => {
                      handleFileUploadClose('thumbnailImage', 'inputHidden');
                    }}
                  />

                  <Controller
                    name="inputHidden"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <TextField
                        sx={{ display: 'none' }}
                        value={value}
                        name={name}
                        onChange={onChange}
                        id="inputHidden"
                      />
                    )}
                  />
                </Stack>
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

export default CustomerAdd;
