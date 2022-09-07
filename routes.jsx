import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import NotFound from './src/components/NotFound/NotFound';
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
import NotRole from './src/features/NotRole/pages/NotRole/NotRole';
import Order from './src/features/Order/pages/Order/Order';
import Product from './src/features/Product/pages/Product/Product';
import User from './src/features/User/pages/User/User';
import DashboardLayout from './src/layouts/DashboardLayout/DashboardLayout';
Router.propTypes = {

};

function Router(props) {
    const user = useSelector(state => state.user).current;
    // console.log('user: ', user);
    let isExpired = false;
    let isLogin = false;
    let roleList = [];

    if (user) {
        const dateNow = new Date();
        if (user.exp * 1000 < dateNow.getTime()) isExpired = true;

        isLogin = !isExpired;
        roleList = user[STORAGE_USER.ROLE].split(',');
    }

    return useRoutes([
        { path: "/", element: isLogin ? <Navigate to="dashboard/dashboard" /> : <Navigate to="login" /> },
        { path: "login", element: <Login /> },
        {
            path: "register", children: [
                {
                    index: true,
                    element: <Register />
                },
                {
                    path: "success",
                    element: <RegisterSuccess />,
                }
            ]
        },
        {
            path: "forgotpassword",
            children: [
                {
                    index: true,
                    element: <ForgotPassword />,
                },
                {
                    path: "reset",
                    children: [
                        {
                            index: true,
                            element: <ResetPassword />,
                        },
                        {
                            path: "success",
                            element: <ResetPasswordSuccess />
                        }]
                }]
        },
        {
            path: "dashboard",
            element: isLogin ? <DashboardLayout /> : <Navigate to="/login" />,
            //Outlet 
            children: [
                { path: "dashboard", element: <Dashboard /> },
                {
                    path: "product",
                    element: roleList.includes('admin') || roleList.includes('member')
                        ? <Product />
                        : <NotRole />
                },
                {
                    path: "user", element: roleList.includes('admin') || roleList.includes('member')
                        ? <User />
                        : <NotRole />
                },
                {
                    path: "customer", element: roleList.includes('admin') || roleList.includes('member')
                        ? <Customer />
                        : <NotRole />
                },
                {
                    path: "category", element: roleList.includes('admin') || roleList.includes('member')
                        ? <Category />
                        : <NotRole />
                },
                {
                    path: "distributor", element: roleList.includes('admin') || roleList.includes('member')
                        ? <Distributor />
                        : <NotRole />
                },
                {
                    path: "news", element: roleList.includes('admin') || roleList.includes('member')
                        ? <News />
                        : <NotRole />
                },
                {
                    path: "order", element: roleList.includes('admin') || roleList.includes('member')
                        ? <Order />
                        : <NotRole />
                },
            ]
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to='404' /> }
    ]);
}

export default Router;

