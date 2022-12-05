import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, Chip, Menu, MenuItem } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';
import productApi from '../../../../api/productApi';
import QuestionDialog from '../../../../components/QuestionDialog/QuestionDialog';
import { formatter, STORAGE_IMAGE } from '../../../../constants/common';
import ProductTableHead from '../ProductTableHead/ProductTableHead';
import ProductTableToolbar from '../ProductTableToolbar/ProductTableToolbar';
import { open } from '../../../Auth/snackbarSlice';

ProductTable.propTypes = {
  onAddOpenClick: PropTypes.func,
  productList: PropTypes.array,
  categoryList: PropTypes.array,
  onSubmit: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onToolbarRemoveClick: PropTypes.func,
};

ProductTable.defaultValues = {
  onAddOpenClick: null,
  productList: [],
  categoryList: [],
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

function ProductTable({
  productList,
  categoryList,
  onSubmit,
  onAddOpenClick,
  onRemoveClick,
  onToolbarRemoveClick,
}) {
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5 });
  const { page, rowsPerPage } = pagination;
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createDate');
  const [selected, setSelected] = useState([]);
  const [controlAnchorEl, setControlAnchorEl] = useState(null);
  const [product, setProduct] = useState(null);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const openAnchorEl = Boolean(controlAnchorEl);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth).current;
  //Authorize
  const checkLogin = (user) => {
    if (!user) return false;

    let isExpired = false;
    const dateNow = new Date();
    if (user.exp * 1000 < dateNow.getTime()) isExpired = true;

    return !isExpired;
  };

  const isLogin = checkLogin(user);

  const checkRoleClaim = (claimType, claimValue) => {
    return user[claimType]?.includes(claimValue);
  };

  const isRemoveRole = checkRoleClaim('product', 'product.remove');

  function createData(
    name,
    code,
    detail,
    images,
    createDate,
    isApproved,
    isBestSale,
    isNew,
    price,
    approvedName,
    userName,
    id
  ) {
    return {
      name,
      code,
      detail,
      images,
      createDate,
      isApproved,
      isBestSale,
      isNew,
      price,
      approvedName,
      userName,
      id,
    };
  }

  const rows = productList.map((product) =>
    createData(
      product.name,
      product.code,
      product.detail,
      product.images,
      product.createDate,
      product.isApproved,
      product.isBestSale,
      product.isNew,
      product.price,
      product.approvedName,
      product.userName,
      product.id
    )
  );

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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPagination((pre) => ({ ...pre, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination((pre) => ({
      ...pre,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  const handleControlOpen = async (event) => {
    event.stopPropagation();
    setControlAnchorEl(event.currentTarget);

    const productId = event.currentTarget?.dataset.id;
    if (!productId) return;

    try {
      const data = await productApi.getById(productId);
      if (data) setProduct(data);
    } catch (error) {
      console.log('Fail to fetch product by id', error);
    }
  };

  const handleControlClose = () => {
    setControlAnchorEl(null);
    setProduct(null);
  };

  const handleSearchSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
    setPagination({ page: 0, rowsPerPage: 5 });
  };

  const handleAddOpen = (event) => {
    if (onAddOpenClick) onAddOpenClick(product);

    //close form control
    handleControlClose();
  };

  const handleQuestionDialogOpen = () => {
    if (!isLogin || !isRemoveRole) {
      const actionSnackbar = open({
        status: true,
        message: 'Không có quyền truy cập chức năng này',
        type: 'error',
      });
      dispatch(actionSnackbar);

      return;
    }

    setOpenQuestionDialog(true);
  };

  const handleQuestionDialogClose = () => {
    setOpenQuestionDialog(false);
  };

  const handleAcceptRemove = () => {
    const productId = product.id;
    if (onRemoveClick) onRemoveClick(productId);

    //close form when remove success
    handleQuestionDialogClose();
    handleControlClose();
  };

  const handleToolbarAcceptRemove = () => {
    if (onToolbarRemoveClick) onToolbarRemoveClick(selected);

    setSelected([]);
  };

  const setImageUrlRow = (row) => {
    const images = row.images;
    if (!images) return STORAGE_IMAGE.PRODUCT_THUMBNAI;

    const image = images.find((x) => x.sortOrder === 0);
    if (!image) return STORAGE_IMAGE.PRODUCT_THUMBNAI;

    const url = image.imageUrl;
    if (!url) return STORAGE_IMAGE.PRODUCT_THUMBNAI;

    const path = `${import.meta.env.VITE_BASE_URL}${url}`;
    return path;
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const getDateFormat = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ProductTableToolbar
          onAddOpenClick={handleAddOpen}
          numSelected={selected.length}
          categoryList={categoryList}
          onSubmit={handleSearchSubmit}
          onAccept={handleToolbarAcceptRemove}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <ProductTableHead
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
                      key={row.id + row.code}
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
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="right">{row.detail}</TableCell>
                      <TableCell align="left">
                        <Avatar
                          variant="square"
                          sx={{ width: 50, height: 50, borderRadius: 1 }}
                          src={setImageUrlRow(row)}
                        />
                      </TableCell>
                      <TableCell align="left">{getDateFormat(row.createDate)}</TableCell>
                      <TableCell align="left">{formatter.format(row.price)}</TableCell>
                      <TableCell align="left">{row.approvedName}</TableCell>
                      <TableCell align="left">{row.userName}</TableCell>
                      <TableCell align="left">
                        <Chip
                          label={row.isApproved ? 'Duyệt' : 'Đóng'}
                          size="small"
                          color={row.isApproved ? 'success' : 'error'}
                          sx={{ fontWeight: '500' }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          label={row.isBestSale ? 'Duyệt' : 'Đóng'}
                          size="small"
                          color={row.isBestSale ? 'success' : 'error'}
                          sx={{ fontWeight: '500' }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          label={row.isNew ? 'Duyệt' : 'Đóng'}
                          size="small"
                          color={row.isNew ? 'success' : 'error'}
                          sx={{ fontWeight: '500' }}
                        />
                      </TableCell>
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
              open={openAnchorEl}
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
    </Box>
  );
}

export default ProductTable;
