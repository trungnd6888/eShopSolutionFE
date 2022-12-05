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

UserAdd.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  roleList: PropTypes.array,
};

UserAdd.defaultValues = {
  user: null,
  open: false,
  onSubmit: null,
  onClose: null,
  roleList: [],
};

function UserAdd({ onClose, onSubmit, open, user, roleList }) {
  const isUpdate = Boolean(user) || false;
  const initialValues = {
    userName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    avatarImage: [],
    inputHidden: '',
    roles: [],
  };
  const resetValues = {
    userName: isUpdate ? user.userName : '',
    fullName: isUpdate ? user.fullName : '',
    email: isUpdate ? user.email : '',
    phoneNumber: isUpdate ? user.phoneNumber : '',
    avatarImage: [],
    inputHidden: isUpdate ? user.avatarImage || '' : '',
    roles: isUpdate ? roleList.filter((x) => user.userRoles.includes(x.id)) : [],
  };

  const schema = yup.object().shape({
    userName: yup.string().required('Vui lòng nhập tên đăng nhập'),
    fullName: yup.string().required('Vui lòng nhập họ tên'),
    email: yup.string().required('Vui lòng nhập email'),
    phoneNumber: yup.string(),
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
    return isUpdate && path ? `${import.meta.env.VITE_BASE_URL}${path}` : '';
  };

  const handleFileUploadClose = (fileUpload, inputHidden) => {
    resetField(fileUpload);
    setValue(inputHidden, '');
  };

  useEffect(() => {
    handleFormReset(resetValues);
  }, [user]);

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
                  name="userName"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="userName"
                      label="Tên đăng nhập *"
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
                  name="fullName"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="fullName"
                      label="Họ tên *"
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
                      label="Email *"
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
                  name="phoneNumber"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="phoneNumber"
                      label="Điện thoại"
                      size="small"
                      variant="standard"
                      error={!!errors.name}
                      helperText={errors?.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="roles"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Autocomplete
                      name={name}
                      value={value}
                      onChange={(event, data) => {
                        onChange(data);
                      }}
                      multiple
                      size="small"
                      id="roles"
                      options={roleList}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" label="Vai trò" />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 2 }}> Hình ảnh</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                  <CustomizeFileUpload
                    initImageUrl={getUrlImage(user?.avatarImage)}
                    defaultImageUrl={STORAGE_IMAGE.AVATAR_THUMBNAI}
                    title="Ảnh đại diện"
                    {...register('avatarImage')}
                    onClose={() => {
                      handleFileUploadClose('avatarImage', 'inputHidden');
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

export default UserAdd;
