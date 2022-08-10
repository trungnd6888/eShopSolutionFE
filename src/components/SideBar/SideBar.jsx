import AppsIcon from '@mui/icons-material/Apps';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import FestivalIcon from '@mui/icons-material/Festival';
import LanguageIcon from '@mui/icons-material/Language';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Avatar, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ImageProfile from '../../../images/profile-image.jpg';

SideBar.propTypes = {
    mobileOpen: PropTypes.bool,
    onDrawerToggle: PropTypes.func,
    drawerWidth: PropTypes.number,
};

SideBar.defaultValues = {
    mobileOpen: false,
    onDrawerToggle: null,
    drawerWidth: 0,
};

const activeStyle = {
    textDecoration: 'underline',
};

function SideBar({ mobileOpen, onDrawerToggle, drawerWidth }) {
    const theme = useTheme();

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
                    alt='profile-image'
                    src={ImageProfile}
                    sx={{
                        width: 36,
                        height: 36,
                    }}
                >
                </Avatar>
                <Typography>Nguyễn Trung</Typography>
            </Toolbar>

            <List>
                {[
                    { name: 'Tổng quan', icon: <AppsIcon />, url: 'dashboard' },
                ].map((text, index) => (

                    <ListItem
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                        component={NavLink}
                        to={text.url}
                        key={text.name[0] + index}
                        disablePadding
                        sx={{ color: 'inherit' }}
                    >
                        <ListItemButton>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>

                ))}
            </List>
            <Divider />
            <List>
                {[
                    { name: 'Sản phẩm', icon: <TouchAppIcon />, url: 'product' },
                    { name: 'Bộ sưu tập', icon: <ArtTrackIcon />, url: 'category' },
                    { name: 'Tin tức', icon: <LanguageIcon />, url: 'news' },
                    { name: 'Người dùng', icon: <CoPresentIcon />, url: 'user' },
                    { name: 'Khách hàng', icon: <AssignmentIndIcon />, url: 'customer' },
                    { name: 'Nhà cung cấp', icon: <FestivalIcon />, url: 'distributor' },
                ].map((text, index) => (
                    <ListItem
                        style={({ isActive }) => isActive ? activeStyle : undefined}
                        component={NavLink}
                        to={text.url}
                        key={text.name[0] + index}
                        disablePadding
                        sx={{ color: 'inherit' }}
                    >
                        <ListItemButton>
                            <ListItemIcon>{text.icon}</ListItemIcon>
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
                    <ListItem key={text.name[0] + index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon> {text.icon} </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box >
    );

    const handleDrawerToggle = () => {
        if (onDrawerToggle) onDrawerToggle();
    };

    return (
        <Box
            component="nav"
            sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
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
    );
}

export default SideBar;