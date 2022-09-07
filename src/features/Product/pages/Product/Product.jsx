import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from '../../../../api/categoryApi';
import distributorApi from '../../../../api/distributorApi';
import productApi from '../../../../api/productApi';
import { STORAGE_USER } from '../../../../constants/common';
import { open } from '../../../Auth/snackbarSlice';
import ProductAdd from '../../components/ProductAdd/ProductAdd';
import ProductTable from '../../components/ProductTable/ProductTable';

Product.propTypes = {

};

function Product(props) {
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [productToAdd, setProductToAdd] = useState(null);
    const [distributorList, setDistributorList] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user).current;
    const userId = user[STORAGE_USER.ID];

    useEffect(() => {
        fetchProduct();
        fetchCategory();
        fetchDistributor();
    }, []);

    const handleSearchSubmit = async (values) => {
        await fetchProduct(values);
    };

    const handleClickOpenAdd = (product) => {
        setOpenAdd(true);
        setProductToAdd(product);
    }

    const handleRemoveClick = async (productId) => {
        try {
            await productApi.remove(productId);

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchProduct();
            }, 500);
        } catch (error) {
            console.log('Fail to remove product: ', error);
        }
    };

    const handleToolbarRemoveClick = (selected) => {
        try {
            selected.forEach(async (id) => {
                await productApi.remove(id);
            });

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchProduct();
            }, 500);
        } catch (error) {
            console.log('Fail to remove product: ', error);
        }
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);

        setTimeout(() => {
            setProductToAdd(null);
        }, 300);
    };

    const FormatStringToNumber = (string) => {
        return Number(string.replaceAll(',', ''));
    };

    const handleAddSubmit = async (values, handleResetFormAdd) => {
        const addValues = {
            ...values,
            isNew: false,
            userId,
            isBestSale: false,
            approvedId: userId,
            price: FormatStringToNumber(values.price),
            categories: values.categories.map(x => x.id),
            distributors: values.distributors.map(x => x.id),
        }

        const addFormData = new FormData();
        for (let key in addValues) {
            const addValue = addValues[key];

            switch (key) {
                case 'thumbnailImages0':
                case 'thumbnailImages1':
                case 'thumbnailImages2':
                case 'thumbnailImages3':
                case 'thumbnailImages4':
                case 'thumbnailImages5':
                case 'thumbnailImages6':
                case 'thumbnailImages7':
                    if (addValue.length <= 0) break;
                    for (let i = 0; i < addValue.length; i++) {
                        addFormData.append(key, addValue.item(i));
                    }
                    break;
                case 'categories':
                case 'distributors':
                    if (addValue.length <= 0) break;
                    addValue.forEach(x => addFormData.append(key, x));
                    break;
                default:
                    addFormData.append(key, addValue);
                    break;
            }
        }

        const updateValues = {
            ...values,
            price: FormatStringToNumber(values.price),
            categories: values.categories.map(x => x.id),
            distributors: values.distributors.map(x => x.id),
        }

        const isUpdate = Boolean(productToAdd) || false;

        if (isUpdate) {
            try {
                await productApi.update(productToAdd.id, updateValues);

                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật sản phẩm thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleCloseAdd();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchProduct();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật sản phẩm không thành công',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }
        else {
            try {
                await productApi.addFormData(addFormData);

                const actionSnackbar = open({
                    status: true,
                    message: 'Thêm sản phẩm thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleCloseAdd();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchProduct();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Mã sản phẩm đã được sử dụng',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }
    };

    const fetchCategory = async () => {
        try {
            const data = await categoryApi.getAll();
            setCategoryList(data);
        } catch (error) {
            console.log('Fail to fetch category list: ', error);
        }
    };

    const fetchDistributor = async () => {
        try {
            const data = await distributorApi.getAll();
            setDistributorList(data);
        } catch (error) {
            console.log('Fail to fetch distributor list: ', error);
        }
    };

    const fetchProduct = async (filters) => {
        try {
            const { data } = await productApi.getAll(filters);
            setProductList(data);
        } catch (error) {
            console.log('Fail to fetch: ', error);
        }
    };

    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách sản phẩm
            </Typography>
            <ProductTable
                productList={productList}
                categoryList={categoryList}
                onSubmit={handleSearchSubmit}
                onAddOpenClick={handleClickOpenAdd}
                onRemoveClick={handleRemoveClick}
                onToolbarRemoveClick={handleToolbarRemoveClick}
            />
            <ProductAdd
                distributorList={distributorList}
                categoryList={categoryList}
                onSubmit={handleAddSubmit}
                onClose={handleCloseAdd}
                open={openAdd}
                product={productToAdd}
            />
        </Container>
    );
}

export default Product; 