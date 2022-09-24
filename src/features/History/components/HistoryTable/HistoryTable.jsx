import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import historyApi from '../../../../api/historyApi';
import QuestionDialog from '../../../../components/QuestionDialog/QuestionDialog';
import HistoryTableHead from '../HistoryTableHead/HistoryTableHead';
import HistoryTableToolbar from '../HistoryTableToolbar/HistoryTableToolbar';

HistoryTable.propTypes = {
    historyList: PropTypes.array,
    onRemoveClick: PropTypes.func,
    onToolbarRemoveClick: PropTypes.func,
};

HistoryTable.defaultValues = {
    historyList: [],
    onRemoveClick: null,
    onToolbarRemoveClick: null,
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function HistoryTable({
    historyList,
    onRemoveClick,
    onToolbarRemoveClick,
}) {
    const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5 });
    const { page, rowsPerPage } = pagination;
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('createDate');
    const [selected, setSelected] = useState([]);
    const [controlAnchorEl, setControlAnchorEl] = useState(null);
    const [history, setHistory] = useState(null);
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const open = Boolean(controlAnchorEl);

    function createData(userName, formName, actionName, time, id) {
        return {
            userName,
            formName,
            actionName,
            time,
            id,
        };
    }

    const rows = historyList.map(history => createData(
        history.userName,
        history.formName,
        history.actionName,
        history.time,
        history.id,
    ));

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleCheckboxClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPagination(pre => ({ ...pre, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setPagination(pre => ({
            ...pre,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        }))
    };

    const handleControlOpen = async (event) => {
        event.stopPropagation();
        setControlAnchorEl(event.currentTarget);

        const historyId = event.currentTarget?.dataset.id
        if (!historyId) return;

        try {
            const history = await historyApi.getById(historyId);
            if (history) setHistory(history);
        } catch (error) {
            console.log('Fail to fetch role by id', error);
        }
    };

    const handleControlClose = () => {
        setControlAnchorEl(null);
        setHistory(null);
    };

    const handleQuestionDialogOpen = () => {
        setOpenQuestionDialog(true);
    };

    const handleQuestionDialogClose = () => {
        setOpenQuestionDialog(false);
    };

    const handleAcceptRemove = () => {
        const historyId = history.id;
        if (onRemoveClick) onRemoveClick(historyId);

        //close form when remove success  
        handleQuestionDialogClose();
        handleControlClose();
    };

    const handleToolbarAcceptRemove = () => {
        if (onToolbarRemoveClick) onToolbarRemoveClick(selected);

        setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <HistoryTableToolbar
                    numSelected={selected.length}
                    onAccept={handleToolbarAcceptRemove}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <HistoryTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id + row.userName}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleCheckboxClick(event, row.id)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.userName}
                                            </TableCell>
                                            <TableCell align="left">{row.formName}</TableCell>
                                            <TableCell align="left">{row.actionName}</TableCell>
                                            <TableCell align="left">{moment(row.time).format('DD/MM/YYYY, HH:mm')}</TableCell>
                                            <TableCell>
                                                <IconButton data-id={row.id} onClick={handleControlOpen}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <Menu
                            onClose={handleControlClose}
                            open={open}
                            anchorEl={controlAnchorEl}
                            elevation={1}
                        >
                            <MenuItem sx={{ pr: 3 }} onClick={handleQuestionDialogOpen}>
                                <DeleteOutlineIcon sx={{ pb: 0.5 }} />
                                <Typography variant="subtitle2">Xóa</Typography>
                            </MenuItem>
                        </Menu>
                        <QuestionDialog
                            open={openQuestionDialog}
                            onClose={handleQuestionDialogClose}
                            onAccept={handleAcceptRemove}
                            message="Bạn muốn xóa bản ghi này không ?"
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box >
    );
}

export default HistoryTable;