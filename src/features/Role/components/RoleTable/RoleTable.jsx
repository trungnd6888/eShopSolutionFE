import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import roleApi from '../../../../api/roleApi';
import QuestionDialog from '../../../../components/QuestionDialog/QuestionDialog';
import RoleTableHead from '../RoleTableHead/RoleTableHead';
import RoleTableToolbar from '../RoleTableToolbar/RoleTableToolbar';
import PeopleIcon from '@mui/icons-material/People';
import roleClaimApi from '../../../../api/roleClaimApi';

RoleTable.propTypes = {
    onAddOpenClick: PropTypes.func,
    onRoleClaimOpenClick: PropTypes.func,
    roleList: PropTypes.array,
    onSubmit: PropTypes.func,
    onRemoveClick: PropTypes.func,
    onToolbarRemoveClick: PropTypes.func,
};

RoleTable.defaultValues = {
    onAddOpenClick: null,
    onRoleClaimOpenClick: null,
    roleList: [],
    onSubmit: null,
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

function RoleTable({
    roleList,
    onSubmit,
    onAddOpenClick,
    onRoleClaimOpenClick,
    onRemoveClick,
    onToolbarRemoveClick,
}) {
    const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5 });
    const { page, rowsPerPage } = pagination;
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('createDate');
    const [selected, setSelected] = useState([]);
    const [controlAnchorEl, setControlAnchorEl] = useState(null);
    const [role, setRole] = useState(null);
    const [roleClaimList, setRoleClaimList] = useState([]);
    const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
    const open = Boolean(controlAnchorEl);

    function createData(name, description, id) {
        return {
            name,
            description,
            id,
        };
    }

    const rows = roleList.map(role => createData(
        role.name,
        role.description,
        role.id,
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

        const roleId = event.currentTarget?.dataset.id
        if (!roleId) return;

        try {
            const role = await roleApi.getById(roleId);
            if (role) setRole(role);

            const params = { roleId };
            const roleClaimList = await roleClaimApi.getAll(params);
            if (roleClaimList) setRoleClaimList(roleClaimList);
        } catch (error) {
            console.log('Fail to fetch role by id', error);
        }
    };

    const handleControlClose = () => {
        setControlAnchorEl(null);
        setRole(null);
    };

    const handleSearchSubmit = async (values) => {
        if (onSubmit) await onSubmit(values);
        setPagination({ page: 0, rowsPerPage: 5 });
    };

    const handleAddOpen = (event) => {
        if (onAddOpenClick) onAddOpenClick(role);

        //close form control 
        handleControlClose();
    };

    const handleRoleClaimOpen = () => {
        if (onRoleClaimOpenClick) onRoleClaimOpenClick(roleClaimList);

        //close form control 
        handleControlClose();
    };

    const handleQuestionDialogOpen = () => {
        setOpenQuestionDialog(true);
    };

    const handleQuestionDialogClose = () => {
        setOpenQuestionDialog(false);
    };

    const handleAcceptRemove = () => {
        const roleId = role.id;
        if (onRemoveClick) onRemoveClick(roleId);

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
                <RoleTableToolbar
                    onAddOpenClick={handleAddOpen}
                    numSelected={selected.length}
                    onSubmit={handleSearchSubmit}
                    onAccept={handleToolbarAcceptRemove}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <RoleTableHead
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
                                            key={row.id + row.name}
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
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
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
                            <MenuItem sx={{ pr: 3 }} onClick={handleAddOpen}>
                                <ModeEditIcon sx={{ pb: 0.5 }} />
                                <Typography variant="subtitle2">Sửa</Typography>
                            </MenuItem>
                            <MenuItem sx={{ pr: 3 }} onClick={handleQuestionDialogOpen}>
                                <DeleteOutlineIcon sx={{ pb: 0.5 }} />
                                <Typography variant="subtitle2">Xóa</Typography>
                            </MenuItem>
                            <MenuItem sx={{ pr: 3 }} onClick={handleRoleClaimOpen}>
                                <PeopleIcon sx={{ pb: 0.5 }} />
                                <Typography variant="subtitle2">Quyền</Typography>
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

export default RoleTable;