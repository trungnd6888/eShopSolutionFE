import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import AvartaImage from '../../../images/profile-image.jpg';

Header.propTypes = {
    onDrawerToggle: PropTypes.func,
    onLogout: PropTypes.func,
    drawerWidth: PropTypes.number,
};

Header.default = {
    onDrawerToggle: null,
    onLogout: null,
    drawerWidth: 0,
};

function Header({ onLogout, onDrawerToggle, drawerWidth }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        if (onLogout) onLogout();
    };

    const handleDrawerToggle = () => {
        if (onDrawerToggle) onDrawerToggle();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { lg: `calc(100% - ${drawerWidth}px)` },
                ml: { lg: `${drawerWidth}px` },
            }}
        >
            <Toolbar sx={{ justifyContent: { xs: 'space-between', lg: 'flex-end' } }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { lg: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
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

                    <Box sx={{ m: 2, mt: 1 }} >
                        <Typography variant='h6'>
                            Nguyễn Trung
                        </Typography>
                        <Typography variant='body2' color='rgb(99, 115, 129)'>
                            trungk47s5@gmail.com
                        </Typography>
                    </Box>


                    <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                    <MenuItem onClick={handleClose}>Trang chủ</MenuItem>
                    <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
                    <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;