import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import NotFound from './src/components/NotFound/NotFound';
import NotRole from './src/components/NotRole/pages/NotRole/NotRole';
import { STORAGE_USER } from './src/constants/common';
import ForgotPassword from './src/features/Auth/components/ForgotPassword/ForgotPassword';
import Login from './src/features/Auth/components/Login/Login';
import Register from './src/features/Auth/components/Register/Register';
import RegisterSuccess from './src/features/Auth/components/RegisterSuccess/RegisterSuccess';
import ResetPassword from './src/features/Auth/components/ResetPassword/ResetPassword';
import ResetPasswordSuccess from './src/features/Auth/components/ResetPasswordSuccess/ResetPasswordSuccess';
import Category from './src/features/Category/pages/Category/Category';
import Customer from './src/features/Customer/pages/Customer/Customer';
import Dashboard from './src/features/Dashboard/pages/Dashboard/Dashboard';
import Distributor from './src/features/Distributor/pages/Distributor/Distributor';
import News from './src/features/News/pages/News/News';
import Role from './src/features/Role/pages/Role/Role';
import Order from './src/features/Order/pages/Order/Order';
import Product from './src/features/Product/pages/Product/Product';
import User from './src/features/User/pages/User/User';
import History from './src/features/History/pages/History/History';
import DashboardLayout from './src/layouts/DashboardLayout/DashboardLayout';
import Banner from './src/features/Banner/pages/Banner/Banner';
Router.propTypes = {};

function Router(props) {
  const user = useSelector((state) => state.auth).current;
  let isExpired = false;
  let isLogin = false;
  let roleList = [];
  const isRoleClaim = (claimType, claimValue) => {
    return user[claimType]?.includes(claimValue);
  };

  if (user) {
    const dateNow = new Date();
    if (user.exp * 1000 < dateNow.getTime()) isExpired = true;

    isLogin = !isExpired;
    roleList = user[STORAGE_USER.ROLE] || [];
  }

  return useRoutes([
    {
      path: '/',
      element: isLogin ? <Navigate to="dashboard/dashboard" /> : <Navigate to="login" />,
    },
    { path: 'login', element: <Login /> },
    {
      path: 'register',
      children: [
        {
          index: true,
          element: <Register />,
        },
        {
          path: 'success',
          element: <RegisterSuccess />,
        },
      ],
    },
    {
      path: 'forgotpassword',
      children: [
        {
          index: true,
          element: <ForgotPassword />,
        },
        {
          path: 'reset',
          children: [
            {
              index: true,
              element: <ResetPassword />,
            },
            {
              path: 'success',
              element: <ResetPasswordSuccess />,
            },
          ],
        },
      ],
    },
    {
      path: 'dashboard',
      element: isLogin ? <DashboardLayout /> : <Navigate to="/login" />,
      //Outlet
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        {
          path: 'product',
          element: isLogin && isRoleClaim('product', 'product.view') ? <Product /> : <NotRole />,
        },
        {
          path: 'user',
          element: isLogin && isRoleClaim('user', 'user.view') ? <User /> : <NotRole />,
        },
        {
          path: 'customer',
          element: isLogin && isRoleClaim('customer', 'customer.view') ? <Customer /> : <NotRole />,
        },
        {
          path: 'category',
          element: isLogin && isRoleClaim('category', 'category.view') ? <Category /> : <NotRole />,
        },
        {
          path: 'distributor',
          element:
            isLogin && isRoleClaim('distributor', 'distributor.view') ? (
              <Distributor />
            ) : (
              <NotRole />
            ),
        },
        {
          path: 'news',
          element: isLogin && isRoleClaim('news', 'news.view') ? <News /> : <NotRole />,
        },
        {
          path: 'order',
          element: isLogin && isRoleClaim('order', 'order.view') ? <Order /> : <NotRole />,
        },
        {
          path: 'role',
          element: isLogin && isRoleClaim('permission', 'permission.view') ? <Role /> : <NotRole />,
        },
        {
          path: 'history',
          element: isLogin ? <History /> : <NotRole />,
        },
        {
          path: 'banner',
          element: isLogin && isRoleClaim('banner', 'banner.view') ? <Banner /> : <NotRole />,
        },
      ],
    },
    { path: '404', element: <NotFound /> },
    { path: 'notrole', element: <NotRole /> },
    { path: '*', element: <Navigate to="404" /> },
  ]);
}

export default Router;
