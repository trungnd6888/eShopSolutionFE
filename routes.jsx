import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from './src/features/Auth/components/Login/Login'
import Register from './src/features/Auth/components/Register/Register'
import NotFound from './src/components/NotFound/NotFound'
import Product from './src/features/Product/components/Product/Product';
import User from './src/features/User/components/User/User';
import Dashboard from './src/layouts/Dashboard/Dashboard';
Router.propTypes = {

};

function Router(props) {
    return useRoutes([
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
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

