import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../features/Auth/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbar() {
    const snackbar = useSelector(state => state.snackbar);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const action = open({ status: false, message: '', type: 'success' });
        dispatch(action);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={snackbar.status} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default CustomizedSnackbar;