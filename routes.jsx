import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import NotFound from './src/components/NotFound/NotFound';
import { STORAGE_CONST } from './src/constants/common';
import ForgotPassword from './src/features/Auth/components/ForgotPassword/ForgotPassword';
import Login from './src/features/Auth/components/Login/Login';
import Register from './src/features/Auth/components/Register/Register';
import RegisterSuccess from './src/features/Auth/components/RegisterSuccess/RegisterSuccess';
import ResetPassword from './src/features/Auth/components/ResetPassword/ResetPassword';
import ResetPasswordSuccess from './src/features/Auth/components/ResetPasswordSuccess/ResetPasswordSuccess';
import Product from './src/features/Product/pages/Product/Product';
import User from './src/features/User/components/User/User';
import Dashboard from './src/features/Dashboard/pages/Dashboard/Dashboard';
import DashboardLayout from './src/layouts/DashboardLayout/DashboardLayout';
Router.propTypes = {

};

function Router(props) {
    const user = JSON.parse(localStorage.getItem(STORAGE_CONST.USER));
    const isLogin = !!user;

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
            element: <DashboardLayout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "product", element: <Product /> },
                { path: "user", element: <User /> },
            ]
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to='404' /> }
    ]);
}

export default Router;

