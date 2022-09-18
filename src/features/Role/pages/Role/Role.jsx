import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import roleApi from '../../../../api/roleApi';
import { open } from '../../../Auth/snackbarSlice';
import RoleClaim from '../../components/RoleClaim/RoleClaim';
import RoleAdd from '../../components/RoleAdd/RoleAdd';
import RoleTable from '../../components/RoleTable/RoleTable';

Role.propTypes = {

};

function Role(props) {
    const [roleList, setRoleList] = useState([]);
    const [roleToAdd, setRoleToAdd] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [roleClaimList, setRoleClaimList] = useState([]);
    const [openRoleClaim, setOpenRoleClaim] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchRole();
    }, []);

    const handleSearchSubmit = async (values) => {
        await fetchRole(values);
    };

    const handleClickOpenAdd = (role) => {
        setOpenAdd(true);
        setRoleToAdd(role);
    }

    const handleRoleClaimClickOpen = (roleClaimList) => {
        setOpenRoleClaim(true);
        setRoleClaimList(roleClaimList);
    }

    const handleRemoveClick = async (roleId) => {
        try {
            await roleApi.remove(roleId);

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchRole();
            }, 500);
        } catch (error) {
            console.log('Fail to remove role: ', error);
        }
    };

    const handleToolbarRemoveClick = (selected) => {
        try {
            selected.forEach(async (id) => {
                await roleApi.remove(id);
            });

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchRole();
            }, 500);
        } catch (error) {
            console.log('Fail to remove role: ', error);
        }
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);

        setTimeout(() => {
            setRoleToAdd(null);
        }, 300);
    };

    const handleAddSubmit = async (values, handleResetFormAdd) => {
        const addValues = {
            ...values,
        }

        const updateValues = {
            ...values,
        }

        const isUpdate = Boolean(roleToAdd) || false;

        if (isUpdate) {
            try {
                await roleApi.update(roleToAdd.id, updateValues);

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
                    fetchRole();
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
                await roleApi.add(addValues);

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
                    fetchRole();
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

    const handleRoleClaimClose = () => {
        setOpenRoleClaim(false);

        setTimeout(() => {
            setRoleClaimList([]);
        }, 300);
    };

    const handleRoleClaimSubmit = async (values, handleResetFormAdd) => {
        const updateValues = {
            ...values,
        }

        const isUpdate = Boolean(roleClaimList) || false;

        if (isUpdate) {
            try {
                await roleApi.update(roleToAdd.id, updateValues);

                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật phân quyền thành công',
                    type: 'success',
                });
                dispatch(actionSnackbar);

                setTimeout(() => {
                    handleRoleClaimClose();
                }, 700);

                setTimeout(() => {
                    handleResetFormAdd();
                    fetchRole();
                }, 1500);
            } catch (error) {
                const actionSnackbar = open({
                    status: true,
                    message: 'Cập nhật phân quyền không thành công',
                    type: 'error',
                });
                dispatch(actionSnackbar);
            }
        }

    };

    const fetchRole = async (filters) => {
        try {
            const { data } = await roleApi.getAll(filters);
            setRoleList(data);
        } catch (error) {
            console.log('Fail to fetch: ', error);
        }
    };

    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách vai trò
            </Typography>
            <RoleTable
                roleList={roleList}
                onSubmit={handleSearchSubmit}
                onAddOpenClick={handleClickOpenAdd}
                onRoleClaimOpenClick={handleRoleClaimClickOpen}
                onRemoveClick={handleRemoveClick}
                onToolbarRemoveClick={handleToolbarRemoveClick}
            />
            <RoleAdd
                onSubmit={handleAddSubmit}
                onClose={handleCloseAdd}
                open={openAdd}
                role={roleToAdd}
            />
            <RoleClaim
                onSubmit={handleRoleClaimSubmit}
                onClose={handleRoleClaimClose}
                open={openRoleClaim}
                roleClaimList={roleClaimList}
            />
        </Container>
    );
}

export default Role; 