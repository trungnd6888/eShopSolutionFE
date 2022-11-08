import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
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
import TextEditor from '../../../../components/TextEditor/TextEditor';
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

NewsAdd.propTypes = {
  news: PropTypes.object,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

NewsAdd.defaultValues = {
  news: null,
  open: false,
  onSubmit: null,
  onClose: null,
};

function NewsAdd({ onClose, onSubmit, open, news }) {
  const isUpdate = Boolean(news) || false;
  const initialValues = {
    title: '',
    summary: '',
    content: '',
    isApproved: false,
    thumbnailImage: [],
    inputHidden: '',
  };
  const resetValues = {
    title: isUpdate ? news.title : '',
    summary: isUpdate && !!news.summary ? news.summary : '',
    content: isUpdate && !!news.content ? news.content : '',
    isApproved: isUpdate ? news.isApproved : false,
    thumbnailImage: [],
    inputHidden: isUpdate ? news.imageUrl : '',
  };

  const schema = yup.object().shape({
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    summary: yup.string(),
    content: yup.string(),
    isApproved: yup.bool(),
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
  }, [news]);

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
                  name="title"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="title"
                      label="Tiêu đề *"
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
                  name="summary"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="summary"
                      label="Tóm tắt"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      id="content"
                      label="Nội dung"
                      size="small"
                      variant="standard"
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    />
                  )}
                />
              </Grid> */}
              <Grid item xs={12} sm={12} md={12}>
                <FormGroup sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="isApproved"
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <Checkbox name={name} onChange={onChange} checked={value} size="small" />
                        )}
                      />
                    }
                    label="Hiển thị"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 2 }}> Hình ảnh</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                  <CustomizeFileUpload
                    initImageUrl={getUrlImage(news?.imageUrl)}
                    defaultImageUrl={STORAGE_IMAGE.PRODUCT_THUMBNAI}
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
              <Grid item xs={12} sm={12} md={12}>
                <Typography sx={{ mb: 2 }}> Nội dung</Typography>
                <Controller
                  name="content"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextEditor name={name} value={value} onChange={onChange} />
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

export default NewsAdd;
