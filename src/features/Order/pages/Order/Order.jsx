import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import orderApi from '../../../../api/orderApi';
import { open } from '../../../Auth/snackbarSlice';
import OrderAdd from '../../components/OrderAdd/OrderAdd';
import OrderTable from '../../components/OrderTable/OrderTable';
import statusApi from '../../../../api/statusApi';

Order.propTypes = {};

function Order(props) {
  const [orderList, setOrderList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [orderToAdd, setOrderToAdd] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrder();
    fetchStatus();
  }, []);

  const handleSearchSubmit = async (values) => {
    await fetchOrder(values);
  };

  const handleClickOpenAdd = (order) => {
    setOpenAdd(true);
    setOrderToAdd(order);
  };

  const handleRemoveClick = async (orderId) => {
    try {
      await orderApi.remove(orderId);

      const actionSnackbar = open({
        status: true,
        message: 'Xoá sản phẩm thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchOrder();
      }, 500);
    } catch (error) {
      console.log('Fail to remove order: ', error);
    }
  };

  const handleToolbarRemoveClick = (selected) => {
    try {
      selected.forEach(async (id) => {
        await orderApi.remove(id);
      });

      const actionSnackbar = open({
        status: true,
        message: 'Xoá sản phẩm thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchOrder();
      }, 500);
    } catch (error) {
      console.log('Fail to remove order: ', error);
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);

    setTimeout(() => {
      setOrderToAdd(null);
    }, 300);
  };

  const handleAddSubmit = async (values, handleResetFormAdd) => {
    const updateValues = {
      ...values,
      statusId: values.status.id,
    };

    const isUpdate = Boolean(orderToAdd) || false;

    if (isUpdate) {
      try {
        await orderApi.update(orderToAdd.id, updateValues);

        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật đơn hàng thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchOrder();
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

  const fetchOrder = async (filters) => {
    try {
      const { data } = await orderApi.getAll(filters);
      setOrderList(data);
    } catch (error) {
      console.log('Fail to fetch: ', error);
    }
  };

  const fetchStatus = async () => {
    try {
      const { data } = await statusApi.getAll();

      setStatusList(data);
    } catch (error) {
      console.log('Fail to fetch status api: ', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Danh sách đơn hàng
      </Typography>
      <OrderTable
        orderList={orderList}
        onSubmit={handleSearchSubmit}
        onAddOpenClick={handleClickOpenAdd}
        onRemoveClick={handleRemoveClick}
        onToolbarRemoveClick={handleToolbarRemoveClick}
      />
      <OrderAdd
        onSubmit={handleAddSubmit}
        onClose={handleCloseAdd}
        open={openAdd}
        order={orderToAdd}
        statusList={statusList}
      />
    </Container>
  );
}

export default Order;
