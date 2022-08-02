import AppsIcon from '@mui/icons-material/Apps';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import FestivalIcon from '@mui/icons-material/Festival';
import LanguageIcon from '@mui/icons-material/Language';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import AvartaImage from '../../../images/profile-image.jpg';

Header.propTypes = {
    onLogout: PropTypes.func
};

Header.default = {
    onLogout: null
};

function Header({ onLogout }) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [state, setState] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
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
                    { name: 'Sản phẩm', icon: <AppsIcon /> },
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
        if (onLogout) onLogout();
    };
    return (
        <div>
            <AppBar>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton size="large" color="inherit" onClick={toggleDrawer(true)} >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={state}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list()}
                    </SwipeableDrawer>

                    <IconButton size="large" color="inherit" onClick={handleClick}>
                        <Avatar
                            alt='image'
                            sx={{ width: '30px', height: '30px' }}
                            src={AvartaImage}
                        />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ position: 'absolute', top: -5 }}
                    >
                        <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            Header
        </div >
    );
}

export default Header;