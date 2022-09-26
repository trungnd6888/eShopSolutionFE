import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import distributorApi from '../../../../api/distributorApi';
import { open } from '../../../Auth/snackbarSlice';
import DistributorAdd from '../../components/DistributorAdd/DistributorAdd';
import DistributorTable from '../../components/DistributorTable/DistributorTable';

Distributor.propTypes = {

};

function Distributor(props) {
    const [distributorList, setDistributorList] = useState([]);
    const [distributorToAdd, setDistributorToAdd] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchDistributor();
    }, []);

    const handleSearchSubmit = async (values) => {
        await fetchDistributor(values);
    };

    const handleClickOpenAdd = (distributor) => {
        setOpenAdd(true);
        setDistributorToAdd(distributor);
    }

    const handleRemoveClick = async (distributorId) => {
        try {
            await distributorApi.remove(distributorId);

            const actionSnackbar = open({
                status: true,
                message: 'Xoá nhà phân phối thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchDistributor();
            }, 500);
        } catch (error) {
            console.log('Fail to remove distributor: ', error);
        }
    };

    const handleToolbarRemoveClick = (selected) => {
        try {
            selected.forEach(async (id) => {
                await distributorApi.remove(id);
            });

            const actionSnackbar = open({
                status: true,
                message: 'Xoá nhà phân phối thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchDistributor();
            }, 500);
        } catch (error) {
            console.log('Fail to remove distributor: ', error);
        }
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);

        setTimeout(() => {
            setDistributorToAdd(null);
        }, 300);
    };

    const handleAddSubmit = async (values, handleResetFormAdd) => {
        const addValues = {
            ...values,
        }

        const updateValues = {
            ...values,
        }

        const isUpdate = Boolean(distributorToAdd) || false;

        if (isUpdate) {
            try {
                await distributorApi.update(distributorToAdd.id, updateValues);

                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật nhà phân phối thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleCloseAdd();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchDistributor();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật nhà phân phối không thành công',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }
        else {
            try {
                await distributorApi.add(addValues);

                const actionSnackbar = open({
                    status: true,
                    message: 'Thêm nhà phân phối thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleCloseAdd();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchDistributor();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Thêm nhà phân phối không thành công',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }
    };

    const fetchDistributor = async (filters) => {
        try {
            const { data } = await distributorApi.getAll(filters);
            setDistributorList(data);
        } catch (error) {
            console.log('Fail to fetch: ', error);
        }
    };

    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách nhà phân phối
            </Typography>
            <DistributorTable
                distributorList={distributorList}
                onSubmit={handleSearchSubmit}
                onAddOpenClick={handleClickOpenAdd}
                onRemoveClick={handleRemoveClick}
                onToolbarRemoveClick={handleToolbarRemoveClick}
            />
            <DistributorAdd
                onSubmit={handleAddSubmit}
                onClose={handleCloseAdd}
                open={openAdd}
                distributor={distributorToAdd}
            />
        </Container>
    );
}

export default Distributor; 