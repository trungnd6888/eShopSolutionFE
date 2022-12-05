import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TableFooter, TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React from 'react';
import { formatter } from '../../../../../constants/common';

OrderRow.propTypes = {
  isItemSelected: PropTypes.bool,
  labelId: PropTypes.string,
  row: PropTypes.object,
  onCheckBox: PropTypes.func,
  onControl: PropTypes.func,
};

OrderRow.defaultValues = {
  isItemSelected: false,
  labelId: '',
  row: null,
  onCheckBox: null,
  onControl: null,
};

const getDateFormat = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

const getMoneyFormat = (price) => {
  return formatter.format(price);
};

function OrderRow({ isItemSelected, labelId, row, onCheckBox, onControl }) {
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const handleCheckBox = (event) => {
    if (onCheckBox) onCheckBox(event, row.id);
  };

  const handleControl = (event) => {
    if (onControl) onControl(event);
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={handleCheckBox}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.code}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">{row.tel}</TableCell>
        <TableCell align="left">{getDateFormat(row.createDate)}</TableCell>
        <TableCell align="left">{row.statusName}</TableCell>
        <TableCell align="left">{row.userName}</TableCell>
        <TableCell align="left">{getMoneyFormat(row.totalAmount)}</TableCell>
        <TableCell>
          <IconButton
            title="Chi tiết đơn"
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton data-id={row.id} onClick={handleControl}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}></TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="button" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã sản phẩm</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderDetails.map((orderDetail, index) => (
                    <TableRow key={index + orderDetail.productId}>
                      <TableCell component="th" scope="row">
                        {orderDetail.productCode}
                      </TableCell>
                      <TableCell align="left">{orderDetail.productName}</TableCell>
                      <TableCell align="left">{getMoneyFormat(orderDetail.productPrice)}</TableCell>
                      <TableCell align="left">{orderDetail.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default OrderRow;
