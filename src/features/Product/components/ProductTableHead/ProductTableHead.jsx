import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { PropTypes } from 'prop-types';
import * as React from 'react';

ProductTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tên sản phẩm',
    },
    {
        id: 'code',
        numeric: false,
        disablePadding: false,
        label: 'Mã',
    },
    {
        id: 'detail',
        numeric: false,
        disablePadding: false,
        label: 'Thông tin',
    },
    {
        id: 'imageUrl',
        numeric: false,
        disablePadding: false,
        label: 'Ảnh',
    },
    {
        id: 'createDate',
        numeric: false,
        disablePadding: false,
        label: 'Ngày tạo',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Giá',
    },
    {
        id: 'approvedId',
        numeric: true,
        disablePadding: false,
        label: 'Mã người duyệt',
    },
    {
        id: 'userId',
        numeric: true,
        disablePadding: false,
        label: 'Mã người tạo',
    },

    {
        id: 'isApproved',
        numeric: false,
        disablePadding: false,
        label: 'Đã duyệt',
    },
    {
        id: 'isBestSale',
        numeric: false,
        disablePadding: false,
        label: 'Bán chạy',
    },
    {
        id: 'isNew',
        numeric: false,
        disablePadding: false,
        label: 'Mới',
    },
    {
        id: 'control',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

function ProductTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default ProductTableHead;