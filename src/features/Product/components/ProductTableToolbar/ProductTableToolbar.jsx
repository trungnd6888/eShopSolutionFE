import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, Button, Grid, TextField, Toolbar, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import QuestionDialog from '../../../../components/QuestionDialog/QuestionDialog';
import { open } from '../../../Auth/snackbarSlice';

ProductTableToolbar.propTypes = {
    onAddOpenClick: PropTypes.func,
    numSelected: PropTypes.number,
    onSubmit: PropTypes.func,
    categoryList: PropTypes.array,
    onRemove: PropTypes.func,
    onAccept: PropTypes.func,
};

ProductTableToolbar.defaultValues = {
    onAddOpenClick: null,
    numberSelected: 0,
    onSubmit: null,
    categoryList: [],
    onRemove: null,
    onAccept: null,
};

function ProductTableToolbar({ numSelected, categoryList, onSubmit, onAddOpenClick, onAccept }) {
    const user = useSelector(state => state.auth).current;
    const dispatch = useDispatch();
    //Authorize
    const checkLogin = (user) => {
        if (!user) return false;

        let isExpired = false;
        const dateNow = new Date();
        if (user.exp * 1000 < dateNow.getTime()) isExpired = true;

        return !isExpired;
    };

    const isLogin = checkLogin(user);

    const checkRoleClaim = (claimType, claimValue) => {
        return user[claimType]?.includes(claimValue);
    }

    const isRemoveRole = checkRoleClaim('product', 'product.remove');

    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);

    const { register, handleSubmit, control } = useForm({
        defaultValues: { keyword: '', categoryIds: [] },
    });

    const handleOnSubmit = async (values) => {
        if (onSubmit) await onSubmit(values);
    };

    const handleClickOpenAdd = () => {
        if (onAddOpenClick) onAddOpenClick();
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
        if (!isLogin || !isRemoveRole) {
            const actionSnackbar = open({
                status: true,
                message: 'Không có quyền truy cập chức năng này',
                type: 'error',
            });
            dispatch(actionSnackbar);

            return;
        }

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
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} sản phẩm
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
                    <Grid item xs={12} sm={5} md={4} >
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
                    <Grid item xs={12} sm={5} md={4} >
                        <Controller
                            name="categoryIds"
                            control={control}
                            render={({ field: { onChange, value } }) =>
                                <Autocomplete
                                    multiple
                                    filterSelectedOptions
                                    size="small"
                                    id="categoryIds"
                                    options={categoryList}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => <TextField
                                        {...params} label="Bộ sưu tập" />}
                                    sx={{
                                        minWidth: 200,
                                        pr: { sm: 2, md: 2 },
                                        pb: 2,
                                    }}
                                    onChange={(event, data) => {
                                        onChange(data.map(x => x.id) || []);
                                    }}
                                    value={categoryList.filter(x => (Array.isArray(value) ? value.map(x => Number(x)) : [Number(value)]).includes(x.id))}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} >
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
                                }
                            }}
                        >
                            <SearchIcon sx={{ mb: 0.5 }} fontSize="small" />
                            Lọc
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} >
                        <Box sx={{ pr: { md: 1 }, textAlign: { md: 'right' } }}>
                            <Button
                                title="Thêm mới"
                                placement="right"
                                variant="contained"
                                onClick={handleClickOpenAdd}
                                sx={{
                                    mb: { xs: 4 },
                                    width: {
                                        xs: '100%',
                                        sm: 'auto',
                                        md: 'auto',
                                    },
                                    minWidth: {
                                        xs: 200,
                                        sm: 'auto',
                                        md: 'auto',
                                    }
                                }}
                            >
                                <AddIcon sx={{ mb: 0.5 }} fontSize="small" />
                                Thêm
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Toolbar >
    );
}

export default ProductTableToolbar;
