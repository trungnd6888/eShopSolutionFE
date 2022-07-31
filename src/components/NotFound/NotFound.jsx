import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { STORAGE_CONST } from '../../constants/common';
import { useNavigate } from 'react-router-dom';

NotFound.propTypes = {

};

const ContentStyle = styled('div')`
    max-width: 450px;
    margin: 16px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    align-items: center;
    height: 100vh;
`;

function NotFound(props) {
    const user = JSON.parse(localStorage.getItem(STORAGE_CONST.USER));
    const isLogin = !!user;
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isLogin) {
            navigate('/login');
            return;
        }
        navigate('/dashboard');
    };

    return (
        <ContentStyle >
            <Typography variant="h4" paragraph >
                Sorry, page not found!
            </Typography>

            <Typography >
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                sure to check your spelling.
            </Typography>

            <Box
                sx={{ mt: 6, mb: 5, maxWidth: 368 }}
                component="img"
                src="public/illustration_404.svg"
            />
            <Button
                variant='contained'
                sx={{ maxWidth: 168 }}
                onClick={handleClick}
            >
                Về trang chủ
            </Button>
        </ContentStyle>
    );
}

export default NotFound;