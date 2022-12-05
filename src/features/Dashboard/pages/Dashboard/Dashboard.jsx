import AdbIcon from '@mui/icons-material/Adb';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { STORAGE_USER } from '../../../../constants/common';
import AppConversionRates from '../../components/AppConversionRates/AppConversionRates';
import AppNewsUpdate from '../../components/AppNewsUpdate/AppNewsUpdate';
import AppTimeline from '../../components/AppTimeline/AppTimeline';
import AppWidgetSummary from '../../components/AppWidgetSummary/AppWidgetSummary';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import productApi from '../../../../api/productApi';
import customerApi from '../../../../api/customerApi';
import orderDetailApi from '../../../../api/orderDetailApi';
import orderApi from '../../../../api/orderApi';
import newsApi from '../../../../api/newsApi';
import moment from 'moment';
import historyApi from '../../../../api/historyApi';

Dashboard.propTypes = {};

// const listTimeline = [
//   { color: 'primary', title: 'Trungnd vừa thêm 1 sản phẩm' },
//   { color: 'success', title: 'Trungnd vừa cập nhật 1 sản phẩm' },
//   { color: 'warning', title: 'Trungnd vừa thêm 1 bài viết' },
//   { color: 'error', title: 'Trungnd vừa xóa 1 sản phẩm' },
//   { color: 'primary', title: 'Trungnd vừa thêm 1 sản phẩm' },
//   { color: 'success', title: 'Trungnd vừa cập nhật 1 sản phẩm' },
// ];

const getPathImage = (url) => {
  return url ? `${import.meta.env.VITE_BASE_URL}${url}` : null;
};

const getStringSlice = (title, number) => {
  return title?.length > number ? `${title.slice(0, number - 1)}...` : title;
};

function Dashboard(props) {
  const user = useSelector((state) => state.auth);
  const fullName = user.current[STORAGE_USER.FULLNAME];
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalQuantityList, setTotalQuantityList] = useState(null);
  const [newsList, setNewsList] = useState(null);
  const [historyList, setHistoryList] = useState(null);

  useEffect(() => {
    fetchTotalProduct();
    fetchTotalCustomer();
    fetchTotalOrder();
    fetchTotalRevenue();
    fetchTotalQuantityList();
    fetchNews();
    fetchHistories();
  }, []);

  const fetchTotalProduct = async () => {
    try {
      const data = await productApi.getTotal();
      if (!data) return;

      setTotalProduct(data);
    } catch (error) {
      console.log('Fail to fetch total product', error);
    }
  };

  const fetchTotalCustomer = async () => {
    try {
      const data = await customerApi.getTotal();
      if (!data) return;

      setTotalCustomer(data);
    } catch (error) {
      console.log('Fail to fetch total customer', error);
    }
  };

  const fetchTotalOrder = async () => {
    try {
      const data = await orderApi.getTotal();
      if (!data) return;

      setTotalOrder(data);
    } catch (error) {
      console.log('Fail to fetch total order', error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const data = await orderDetailApi.getTotal();
      if (!data) return;

      setTotalRevenue(data);
    } catch (error) {
      console.log('Fail to fetch total revenue', error);
    }
  };

  const fetchTotalQuantityList = async () => {
    try {
      const data = await orderDetailApi.getTotalQuantity();
      if (!data) return;

      setTotalQuantityList(data);
    } catch (error) {
      console.log('Fail to fetch total quantity: ', error);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await newsApi.getNew();
      if (!data) return;

      setNewsList(data);
    } catch (error) {
      console.log('Fail to fetch news', error);
    }
  };

  const fetchHistories = async () => {
    try {
      const data = await historyApi.getNew();
      if (!data) return;

      console.log('historyList: ', data);

      setHistoryList(data);
    } catch (error) {
      console.log('Fail to fetch histories', error);
    }
  };

  const listWidget = [
    {
      id: 1,
      color: 'primary',
      icon: <AdbIcon />,
      quantity: totalProduct,
      name: 'Sản phẩm',
    },
    {
      id: 2,
      color: 'success',
      icon: <AppleIcon />,
      quantity: totalCustomer,
      name: 'Khách hàng',
    },
    {
      id: 3,
      color: 'error',
      icon: <AndroidIcon />,
      quantity: totalOrder,
      name: 'Đơn hàng',
    },
    {
      id: 4,
      color: 'warning',
      icon: <OndemandVideoIcon />,
      quantity: totalRevenue,
      name: 'Doanh thu',
    },
  ];

  const listChart =
    totalQuantityList?.map((x) => ({
      label: x.productCode,
      value: x.sumQuantity,
    })) || [];

  const listNewsUpdate = newsList?.map((x) => ({
    title: getStringSlice(x.title, 50),
    description: getStringSlice(x.summary, 60),
    image: getPathImage(x.imageUrl),
    time: moment(x.createDate).fromNow(),
  }));

  const getTitleTimeLine = (item) => {
    return `${item.userName} vừa ${item.actionName} 1 ${item.formName}`;
  };

  const getColorTimeLine = (item) => {
    switch (item.actionId) {
      case 1:
        return 'primary';
        break;

      case 2:
        return 'success';
        break;

      default:
        return 'error';
        break;
    }
  };

  const listTimeline = historyList?.map((x) => ({
    color: getColorTimeLine(x),
    title: getTitleTimeLine(x),
  }));

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>{`Chào ! ${fullName}.`}</Typography>
      <Grid container spacing={4}>
        {listWidget.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              name={item.name}
              icon={item.icon}
              color={item.color}
              quantity={item.quantity}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12}>
          <AppConversionRates title="Sản phẩm bán chạy" subheader="" chartData={listChart} />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <AppNewsUpdate list={listNewsUpdate} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AppTimeline list={listTimeline} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
