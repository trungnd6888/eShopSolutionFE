import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import roleApi from '../../../../api/roleApi';
import roleClaimApi from '../../../../api/roleClaimApi';
import { open } from '../../../Auth/snackbarSlice';
import RoleAdd from '../../components/RoleAdd/RoleAdd';
import RoleClaim from '../../components/RoleClaim/RoleClaim';
import RoleTable from '../../components/RoleTable/RoleTable';

Role.propTypes = {};

function Role(props) {
  const [roleList, setRoleList] = useState([]);
  const [roleToAdd, setRoleToAdd] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [roleClaimList, setRoleClaimList] = useState([]);
  const [openRoleClaim, setOpenRoleClaim] = useState(false);
  const dispatch = useDispatch();

  const rows = [
    'product',
    'category',
    'news',
    'distributor',
    'order',
    'customer',
    'permission',
    'user',
    'banner',
    'profile',
  ];

  useEffect(() => {
    fetchRole();
  }, []);

  const handleSearchSubmit = async (values) => {
    await fetchRole(values);
  };

  const handleClickOpenAdd = (role) => {
    setOpenAdd(true);
    setRoleToAdd(role);
  };

  const handleRoleClaimClickOpen = (roleClaimList, role) => {
    setOpenRoleClaim(true);
    setRoleClaimList(roleClaimList);
    setRoleToAdd(role);
  };

  const handleRemoveClick = async (roleId) => {
    try {
      await roleApi.remove(roleId);

      const actionSnackbar = open({
        status: true,
        message: 'Xoá quyền thành công',
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
        message: 'Xoá quyền thành công',
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
    };

    const updateValues = {
      ...values,
    };

    const isUpdate = Boolean(roleToAdd) || false;

    if (isUpdate) {
      try {
        await roleApi.update(roleToAdd.id, updateValues);

        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật quyền thành công',
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
          message: 'Cập nhật quyền không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    } else {
      try {
        await roleApi.add(addValues);

        const actionSnackbar = open({
          status: true,
          message: 'Thêm quyền thành công',
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
          message: 'Mã quyền đã được sử dụng',
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

  const handleRoleClaimSubmit = async (values, handleRoleClaimFormReset) => {
    const updateValues = {
      ...values,
    };

    const roleClaimNewList = [];
    rows.forEach((x) => {
      for (const prop in updateValues) {
        if (prop === `${x}View` && updateValues[prop] === true) {
          roleClaimNewList.push({
            roleId: roleToAdd.id,
            claimType: x,
            claimValue: `${x}.view`,
          });
        }

        if (prop === `${x}Create` && updateValues[prop] === true) {
          roleClaimNewList.push({
            roleId: roleToAdd.id,
            claimType: x,
            claimValue: `${x}.create`,
          });
        }

        if (prop === `${x}Update` && updateValues[prop] === true) {
          roleClaimNewList.push({
            roleId: roleToAdd.id,
            claimType: x,
            claimValue: `${x}.update`,
          });
        }

        if (prop === `${x}Remove` && updateValues[prop] === true) {
          roleClaimNewList.push({
            roleId: roleToAdd.id,
            claimType: x,
            claimValue: `${x}.remove`,
          });
        }
      }
    });

    const isUpdate = Boolean(roleClaimList) || false;

    if (isUpdate) {
      try {
        //get old roleClaim
        const params = {
          roleId: roleToAdd.id,
        };
        const roleClaimOldList = await roleClaimApi.getAll(params);

        //remove old roleClaim
        roleClaimOldList.forEach(async (x) => await roleClaimApi.remove(x.id));

        //add new roleClaim
        roleClaimNewList.forEach(async (x) => await roleClaimApi.add(x));

        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật quyền thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleRoleClaimClose();
        }, 700);

        setTimeout(() => {
          handleRoleClaimFormReset();
          fetchRole();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật quyền không thành công',
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
      console.log('Fail to fetch role: ', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 3 }}>
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
