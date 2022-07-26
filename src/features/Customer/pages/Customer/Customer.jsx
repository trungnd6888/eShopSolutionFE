import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import customerApi from '../../../../api/customerApi';
import { open } from '../../../Auth/snackbarSlice';
import CustomerAdd from '../../components/CustomerAdd/CustomerAdd';
import CustomerTable from '../../components/CustomerTable/CustomerTable';

Customer.propTypes = {};

function Customer(props) {
  const [customerList, setCustomerList] = useState([]);
  const [customerToAdd, setCustomerToAdd] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSearchSubmit = async (values) => {
    await fetchCustomer(values);
  };

  const handleClickOpenAdd = (customer) => {
    setOpenAdd(true);
    setCustomerToAdd(customer);
  };

  const handleRemoveClick = async (customerId) => {
    try {
      await customerApi.remove(customerId);

      const actionSnackbar = open({
        status: true,
        message: 'Xoá bố sưu tập thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchCustomer();
      }, 500);
    } catch (error) {
      console.log('Fail to remove customer: ', error);
    }
  };

  const handleToolbarRemoveClick = (selected) => {
    try {
      selected.forEach(async (id) => {
        await customerApi.remove(id);
      });

      const actionSnackbar = open({
        status: true,
        message: 'Xoá khách hàng thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchCustomer();
      }, 500);
    } catch (error) {
      console.log('Fail to remove customer: ', error);
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);

    setTimeout(() => {
      setCustomerToAdd(null);
    }, 300);
  };

  const handleAddSubmit = async (values, handleResetFormAdd) => {
    const addValues = {
      ...values,
    };

    const addFormData = new FormData();
    for (let key in addValues) {
      const addValue = addValues[key];

      switch (key) {
        case 'thumbnailImage':
          if (addValue.length <= 0) break;
          for (let i = 0; i < addValue.length; i++) {
            addFormData.append(key, addValue.item(i));
          }
          break;

        default:
          addFormData.append(key, addValue);
          break;
      }
    }

    const updateValues = {
      ...values,
    };

    const updateFormData = new FormData();
    for (let key in updateValues) {
      const updateValue = updateValues[key];

      switch (key) {
        case 'thumbnailImage':
          if (updateValue.length <= 0) break;
          for (let i = 0; i < updateValue.length; i++) {
            updateFormData.append(key, updateValue.item(i));
          }
          break;

        default:
          updateFormData.append(key, updateValue);
          break;
      }
    }

    const isUpdate = Boolean(customerToAdd) || false;

    if (isUpdate) {
      try {
        await customerApi.updateFormData(customerToAdd.id, updateFormData);

        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật khách hàng thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchCustomer();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật khách hàng không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    } else {
      try {
        await customerApi.addFormData(addFormData);

        const actionSnackbar = open({
          status: true,
          message: 'Thêm khách hàng thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchCustomer();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Thêm khách hàng không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    }
  };

  const fetchCustomer = async (filters) => {
    try {
      const { data } = await customerApi.getAll(filters);
      setCustomerList(data);
    } catch (error) {
      console.log('Fail to fetch: ', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Danh sách khách hàng
      </Typography>
      <CustomerTable
        customerList={customerList}
        onSubmit={handleSearchSubmit}
        onAddOpenClick={handleClickOpenAdd}
        onRemoveClick={handleRemoveClick}
        onToolbarRemoveClick={handleToolbarRemoveClick}
      />
      <CustomerAdd
        onSubmit={handleAddSubmit}
        onClose={handleCloseAdd}
        open={openAdd}
        customer={customerToAdd}
      />
    </Container>
  );
}

export default Customer;
