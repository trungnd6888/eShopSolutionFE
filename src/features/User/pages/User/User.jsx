import { FaceRetouchingNaturalOutlined } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import roleApi from '../../../../api/roleApi';
import userApi from '../../../../api/userApi';
import { open } from '../../../Auth/snackbarSlice';
import UserAdd from '../../components/UserAdd/UserAdd';
import UserTable from '../../components/UserTable/UserTable';

User.propTypes = {

};

function User(props) {
    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [userToAdd, setUserToAdd] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUser();
        fetchRole();
    }, []);

    const handleSearchSubmit = async (values) => {
        await fetchUser(values);
    };

    const handleClickOpenAdd = (user) => {
        setOpenAdd(true);
        setUserToAdd(user);
    }

    const handleRemoveClick = async (userId) => {
        try {
            await userApi.remove(userId);

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchUser();
            }, 500);
        } catch (error) {
            console.log('Fail to remove user: ', error);
        }
    };

    const handleToolbarRemoveClick = (selected) => {
        try {
            selected.forEach(async (id) => {
                await userApi.remove(id);
            });

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchUser();
            }, 500);
        } catch (error) {
            console.log('Fail to remove user: ', error);
        }
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);

        setTimeout(() => {
            setUserToAdd(null);
        }, 300);
    };

    const handleAddSubmit = async (values, handleResetFormAdd) => {
        const updateValues = {
            ...values,
            roles: values.roles.map(x => x.id),
        }

        const updateFormData = new FormData();
        for (let key in updateValues) {
            const updateValue = updateValues[key];

            switch (key) {

                case 'avatarImage':
                    if (updateValue.length <= 0) break;
                    for (let i = 0; i < updateValue.length; i++) {
                        updateFormData.append(key, updateValue.item(i));
                    }
                    break;
                case 'roles':
                    if (updateValue.length <= 0) break;
                    updateValue.forEach(x => updateFormData.append(key, x));
                    break;
                default:
                    updateFormData.append(key, updateValue);
                    break;
            }
        }

        const isUpdate = Boolean(userToAdd) || false;

        if (isUpdate) {
            try {
                await userApi.updateFormData(userToAdd.id, updateFormData);

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
                    fetchUser();
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
    };

    const fetchUser = async (filters) => {
        try {
            const { data } = await userApi.getAll(filters);
            setUserList(data);
        } catch (error) {
            console.log('Fail to fetch: ', error);
        }
    };

    const fetchRole = async () => {
        try {
            const { data } = await roleApi.getAll();
            setRoleList(data);
        } catch (error) {
            console.log('Fail to fetch role api: ', error);
        }
    };

    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách người dùng
            </Typography>
            <UserTable
                userList={userList}
                onSubmit={handleSearchSubmit}
                onAddOpenClick={handleClickOpenAdd}
                onRemoveClick={handleRemoveClick}
                onToolbarRemoveClick={handleToolbarRemoveClick}
            />
            <UserAdd
                onSubmit={handleAddSubmit}
                onClose={handleCloseAdd}
                open={openAdd}
                user={userToAdd}
                roleList={roleList}
            />
        </Container>
    );
}

export default User; 