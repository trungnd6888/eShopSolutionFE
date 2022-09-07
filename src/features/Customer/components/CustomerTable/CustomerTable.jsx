import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Chip, Menu, MenuItem } from '@mui/material';
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
import * as React from 'react';
import { useState } from 'react';
import ImageProfile from '../../../../../images/profile-image.jpg';
import CustomerTableHead from '../CustomerTableHead/CustomerTableHead';
import CustomerTableToolbar from '../CustomerTableToolbar/CustomerTableToolbar';

function createData(name, calories, fat, carbs, protein, image, status) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        image,
        status,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3, ImageProfile, true),
    createData('Donut', 452, 25.0, 51, 4.9, ImageProfile, true),
    createData('Eclair', 262, 16.0, 24, 6.0, ImageProfile, true),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, ImageProfile, false),
    createData('Gingerbread', 356, 16.0, 49, 3.9, ImageProfile, false),
    createData('Honeycomb', 408, 3.2, 87, 6.5, ImageProfile, true),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, ImageProfile, false),
    createData('Jelly Bean', 375, 0.0, 94, 0.0, ImageProfile, false),
    createData('KitKat', 518, 26.0, 65, 7.0, ImageProfile, true),
    createData('Lollipop', 392, 0.2, 98, 0.0, ImageProfile, false),
    createData('Marshmallow', 318, 0, 81, 2.0, ImageProfile, true),
    createData('Nougat', 360, 19.0, 9, 37.0, ImageProfile, false),
    createData('Oreo', 437, 18.0, 63, 4.0, ImageProfile, false),
];

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

function CustomerTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [controlAnchorEl, setControlAnchorEl] = useState(null);
    const open = Boolean(controlAnchorEl);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleControlClick = (event) => {
        event.stopPropagation();
        setControlAnchorEl(event.currentTarget);
    };

    const handleControlClose = () => {
        setControlAnchorEl(null);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <CustomerTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <CustomerTableHead
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
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.name)}
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
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="left">
                                                <Avatar variant='square' src={row.image} sx={{ width: 50, height: 50, borderRadius: 1 }} />
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Chip
                                                    label={row.status ? 'Active' : 'Disable'}
                                                    size="small"
                                                    color={row.status ? 'success' : 'error'}
                                                    sx={{ fontWeight: '500' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={handleControlClick}>
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
                <Menu
                    onClose={handleControlClose}
                    open={open}
                    anchorEl={controlAnchorEl}
                    elevation={1}
                >
                    <MenuItem sx={{ pr: 3 }}>
                        <ModeEditIcon sx={{ pb: 0.5 }} />
                        <Typography variant="subtitle2" >Sửa</Typography>
                    </MenuItem>
                    <MenuItem sx={{ pr: 3 }}>
                        <DeleteOutlineIcon sx={{ pb: 0.5 }} />
                        <Typography variant="subtitle2">Xóa</Typography>
                    </MenuItem>
                </Menu>
            </Paper>
        </Box>
    );
}

export default CustomerTable;