import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import QuestionDialog from '../../../../components/QuestionDialog/QuestionDialog';

HistoryTableToolbar.propTypes = {
    numSelected: PropTypes.number,
    onAccept: PropTypes.func,
};

HistoryTableToolbar.defaultValues = {
    numberSelected: 0,
    onAccept: null,
};

function HistoryTableToolbar({ numSelected, onAccept }) {
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);

    const handleQuestionDialogClose = () => {
        setOpenQuestionDialog(false);
    };

    const handleQuestionDialogAccept = () => {
        if (onAccept) onAccept();

        //close form when remove success
        handleQuestionDialogClose();
    };

    const handleRemove = () => {
        setOpenQuestionDialog(true);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 && (
                <>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} sản phẩm
                    </Typography>
                    <Tooltip title="Xóa">
                        <IconButton onClick={handleRemove}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <QuestionDialog
                        open={openQuestionDialog}
                        onClose={handleQuestionDialogClose}
                        onAccept={handleQuestionDialogAccept}
                        message="Bạn có muốn xóa những bản ghi này"
                    />
                </>
            )}
        </Toolbar >
    );
}

export default HistoryTableToolbar;
