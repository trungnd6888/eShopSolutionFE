import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

QuestionDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
    mesasage: PropTypes.string,
};

QuestionDialog.defaultValues = {
    open: false,
    onClose: null,
    onAccept: null,
    message: '',
};

function QuestionDialog({ open, onClose, onAccept, message }) {
    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleAccept = () => {
        if (onAccept) onAccept();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAccept} autoFocus>Chấp nhận</Button>
                <Button onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    );
}

export default QuestionDialog;