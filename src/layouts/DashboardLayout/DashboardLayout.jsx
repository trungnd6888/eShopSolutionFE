import { useTheme } from '@emotion/react';
import AppsIcon from '@mui/icons-material/Apps';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import FestivalIcon from '@mui/icons-material/Festival';
import LanguageIcon from '@mui/icons-material/Language';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { logout } from '../../features/Auth/userSlice';

const drawerWidth = 240;

function DashboardLayout(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box
            sx={{ width: 239 }}
            role="presentation"
        >
            <Toolbar sx={{
                m: 2,
                justifyContent: 'space-around',
                backgroundColor: theme.palette.action.hover,
                borderRadius: '12px'
            }}>
                <Avatar
                    sx={{
                        width: '36px',
                        height: '36px'
                    }}
                    alt='profile-image'
                    src='././././images/profile-image.jpg'
                >
                </Avatar>
                <Typography>Nguyễn Trung</Typography>
            </Toolbar>

            <List>
                {[
                    { name: 'Tổng quan', icon: <AppsIcon /> },
                ].map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    { name: 'Sản phẩm', icon: <TouchAppIcon /> },
                    { name: 'Bộ sưu tập', icon: <ArtTrackIcon /> },
                    { name: 'Tin tức', icon: <LanguageIcon /> },
                    { name: 'Người dùng', icon: <CoPresentIcon /> },
                    { name: 'Khách hàng', icon: <AssignmentIndIcon /> },
                    { name: 'Nhà cung cấp', icon: <FestivalIcon /> },
                ].map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    { name: 'Đơn hàng', icon: <DeliveryDiningIcon /> },
                    { name: 'Phân quyền', icon: <ManageAccountsIcon /> },
                ].map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box >
    );

    const handleLogout = () => {
        const action = logout(user);
        dispatch(action);
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header onDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} onLogout={handleLogout} />
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ mt: 10, width: { xs: '100%', lg: `calc(100% - ${drawerWidth}px)` } }}
            >
                < Outlet />
                <Footer />
            </Box>
        </Box>
    );
}

export default DashboardLayout;
