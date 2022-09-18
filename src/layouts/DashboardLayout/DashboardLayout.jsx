import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { logout } from '../../features/Auth/authSlice';

const drawerWidth = 240;

function DashboardLayout(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        const action = logout(user);
        dispatch(action);
        navigate('/login');
    };

    const RootStyle = styled(Box)({
        display: 'flex',
    });

    const MainStyle = styled(Box)({
        overflowX: 'auto',
        marginTop: 80,
        width: {
            xs: '100%',
            lg: `calc(100% - ${drawerWidth}px)`
        }
    });

    return (
        <RootStyle>
            <Header drawerWidth={drawerWidth} onLogout={handleLogout} />
            <SideBar drawerWidth={drawerWidth} />
            <MainStyle component="main" sx={{ width: '100%' }}>
                < Outlet />
            </MainStyle>
        </RootStyle >
    );
}

export default DashboardLayout;
