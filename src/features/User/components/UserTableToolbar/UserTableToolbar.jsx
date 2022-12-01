import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, TextField, Toolbar, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import QuestionDialog from '../../../../components/QuestionDialog/QuestionDialog';
UserTableToolbar.propTypes = {
  onAddOpenClick: PropTypes.func,
  numSelected: PropTypes.number,
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onAccept: PropTypes.func,
};

UserTableToolbar.defaultValues = {
  onAddOpenClick: null,
  numberSelected: 0,
  onSubmit: null,
  onRemove: null,
  onAccept: null,
};

function UserTableToolbar({ numSelected, onSubmit, onAddOpenClick, onAccept }) {
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: { keyword: '' },
  });

  const handleOnSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  const handleQuestionDialogClose = () => {
    setOpenQuestionDialog(false);
  };

  const handleQuestionDialogAccept = () => {
    if (onAccept) onAccept();

    //close form when remove success
    handleQuestionDialogClose();
  };

  const handleRemove = () => {
    setOpenQuestionDialog(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} lựa chọn
          </Typography>
          <Tooltip title="Xóa">
            <IconButton onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <QuestionDialog
            open={openQuestionDialog}
            onClose={handleQuestionDialogClose}
            onAccept={handleQuestionDialogAccept}
            message="Bạn có muốn xóa những bản ghi này"
          />
        </>
      ) : (
        <Grid component="form" onSubmit={handleSubmit(handleOnSubmit)} container sx={{ pt: 1 }}>
          <Grid item xs={12} sm={5} md={4}>
            <TextField
              {...register('keyword')}
              fullWidth
              label="Từ khóa"
              size="small"
              variant="outlined"
              sx={{
                minWidth: 200,
                pb: 2,
                pr: { sm: 2, md: 2 },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2} md={2}>
            <Button
              type="submit"
              title="Tìm kiếm"
              placement="right"
              variant="outlined"
              sx={{
                mb: { xs: 2 },
                width: {
                  xs: '100%',
                  sm: 'auto',
                  md: 'auto',
                },
                minWidth: {
                  xs: 200,
                  sm: 97,
                  md: 'auto',
                },
              }}
            >
              <SearchIcon sx={{ mb: 0.5 }} fontSize="small" />
              Lọc
            </Button>
          </Grid>
          <Grid item xs={12} sm={5} md={4}></Grid>
        </Grid>
      )}
    </Toolbar>
  );
}

export default UserTableToolbar;
