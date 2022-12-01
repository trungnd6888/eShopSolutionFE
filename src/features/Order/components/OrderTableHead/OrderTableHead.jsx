import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { PropTypes } from 'prop-types';
import * as React from 'react';

OrderTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const headCells = [
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'Mã đơn',
  },

  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Người nhận',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Địa chỉ',
  },
  {
    id: 'tel',
    numeric: false,
    disablePadding: false,
    label: 'Điện thoại',
  },
  {
    id: 'createDate',
    numeric: false,
    disablePadding: false,
    label: 'Ngày tạo đơn',
  },
  {
    id: 'statusName',
    numeric: false,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'customerId',
    numeric: false,
    disablePadding: false,
    label: 'Mã khách',
  },
  {
    id: 'totalAmount',
    numeric: false,
    disablePadding: false,
    label: 'Thành tiền',
  },
  {
    id: 'collapse',
    numeric: false,
    disablePadding: false,
    label: 'Chi tiết đơn',
  },
  {
    id: 'control',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

function OrderTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

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

export default OrderTableHead;
