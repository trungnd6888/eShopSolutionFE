import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { STORAGE_IMAGE, STORAGE_USER } from '../../constants/common';
import { openDrawer } from '../../layouts/drawerSlice';

Header.propTypes = {
  onLogout: PropTypes.func,
  drawerWidth: PropTypes.number,
};

Header.default = {
  onLogout: null,
  drawerWidth: 0,
};

function Header({ onLogout, drawerWidth }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const drawer = useSelector((state) => state.drawer);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const name = user.current[STORAGE_USER.NAME];
  const emailAddress = user.current[STORAGE_USER.EMAIL_ADDRESS];
  const avatarImageUrl = user.current[STORAGE_USER.AVATAR_IMAGE_URL];

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
    const action = openDrawer(!drawer);
    dispatch(action);
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
            alt="image"
            sx={{ width: '30px', height: '30px' }}
            src={
              avatarImageUrl
                ? `${import.meta.env.VITE_BASE_URL}${avatarImageUrl}`
                : STORAGE_IMAGE.AVATAR_THUMBNAI
            }
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
          // sx={{ position: 'absolute', top: -5 }}
          sx={{ top: -5 }}
        >
          <Box sx={{ m: 2, mt: 1 }}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="rgb(99, 115, 129)">
              {emailAddress}
            </Typography>
          </Box>

          <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          <MenuItem component={NavLink} to="/dashboard/dashboard">
            Trang chủ
          </MenuItem>
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
