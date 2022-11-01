import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import categoryApi from '../../../../api/categoryApi';
import { open } from '../../../Auth/snackbarSlice';
import CategoryAdd from '../../components/CategoryAdd/CategoryAdd';
import CategoryTable from '../../components/CategoryTable/CategoryTable';

Category.propTypes = {

};

function Category(props) {
    const [categoryList, setCategoryList] = useState([]);
    const [categoryToAdd, setCategoryToAdd] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleSearchSubmit = async (values) => {
        await fetchCategory(values);
    };

    const handleClickOpenAdd = (category) => {
        setOpenAdd(true);
        setCategoryToAdd(category);
    }

    const handleRemoveClick = async (categoryId) => {
        try {
            await categoryApi.remove(categoryId);

            const actionSnackbar = open({
                status: true,
                message: 'Xoá bố sưu tập thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchCategory();
            }, 500);
        } catch (error) {
            console.log('Fail to remove category: ', error);
        }
    };

    const handleToolbarRemoveClick = (selected) => {
        try {
            selected.forEach(async (id) => {
                await categoryApi.remove(id);
            });

            const actionSnackbar = open({
                status: true,
                message: 'Xoá bộ sưu tập thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchCategory();
            }, 500);
        } catch (error) {
            console.log('Fail to remove category: ', error);
        }
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);

        setTimeout(() => {
            setCategoryToAdd(null);
        }, 300);
    };

    const handleAddSubmit = async (values, handleResetFormAdd) => {
        const addValues = {
            ...values,
        }

        const updateValues = {
            ...values,
        }

        const isUpdate = Boolean(categoryToAdd) || false;

        if (isUpdate) {
            try {
                await categoryApi.update(categoryToAdd.id, updateValues);

                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật bộ sưu tập thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleCloseAdd();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchCategory();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật bộ sưu tập không thành công',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }
        else {
            try {
                await categoryApi.add(addValues);

                const actionSnackbar = open({
                    status: true,
                    message: 'Thêm bộ sưu tập thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleCloseAdd();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchCategory();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Thêm bộ sưu tập không thành công',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }
    };

    const fetchCategory = async (filters) => {
        try {
            const { data } = await categoryApi.getAll(filters);
            setCategoryList(data);
        } catch (error) {
            console.log('Fail to fetch: ', error);
        }
    };

    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách bộ sưu tập
            </Typography>
            <CategoryTable
                categoryList={categoryList}
                onSubmit={handleSearchSubmit}
                onAddOpenClick={handleClickOpenAdd}
                onRemoveClick={handleRemoveClick}
                onToolbarRemoveClick={handleToolbarRemoveClick}
            />
            <CategoryAdd
                onSubmit={handleAddSubmit}
                onClose={handleCloseAdd}
                open={openAdd}
                category={categoryToAdd}
            />
        </Container>
    );
}

export default Category; 