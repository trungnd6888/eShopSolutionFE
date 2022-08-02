import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import NotFound from './src/components/NotFound/NotFound';
import { STORAGE_CONST } from './src/constants/common';
import ForgotPassword from './src/features/Auth/components/ForgotPassword/ForgotPassword';
import Login from './src/features/Auth/components/Login/Login';
import Register from './src/features/Auth/components/Register/Register';
import ResetPassword from './src/features/Auth/components/ResetPassword/ResetPassword';
import Product from './src/features/Product/components/Product/Product';
import User from './src/features/User/components/User/User';
import Dashboard from './src/layouts/Dashboard/Dashboard';
Router.propTypes = {

};

function Router(props) {
    const user = JSON.parse(localStorage.getItem(STORAGE_CONST.USER));
    const isLogin = !!user;

    return useRoutes([
        { path: "/", element: isLogin ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgotpassword", element: <ForgotPassword /> },
        { path: "/resetpassword", element: <ResetPassword /> },
        { path: "/404", element: <NotFound /> },
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
                { path: "product", element: <Product /> },
                { path: "user", element: <User /> },
            ]
        },
    ]);
}

export default Router;

