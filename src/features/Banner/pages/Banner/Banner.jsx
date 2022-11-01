import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import bannerApi from '../../../../api/bannerApi';
import { open } from '../../../Auth/snackbarSlice';
import BannerAdd from '../../components/BannerAdd/BannerAdd';
import BannerTable from '../../components/BannerTable/BannerTable';

Banner.propTypes = {};

function Banner(props) {
  const [bannerList, setBannerList] = useState([]);
  const [bannerToAdd, setBannerToAdd] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleSearchSubmit = async (values) => {
    await fetchBanner(values);
  };

  const handleClickOpenAdd = (banner) => {
    setOpenAdd(true);
    setBannerToAdd(banner);
  };

  const handleRemoveClick = async (bannerId) => {
    try {
      await bannerApi.remove(bannerId);

      const actionSnackbar = open({
        status: true,
        message: 'Xoá bố sưu tập thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchBanner();
      }, 500);
    } catch (error) {
      console.log('Fail to remove banner: ', error);
    }
  };

  const handleToolbarRemoveClick = (selected) => {
    try {
      selected.forEach(async (id) => {
        await bannerApi.remove(id);
      });

      const actionSnackbar = open({
        status: true,
        message: 'Xoá ảnh bìa thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchBanner();
      }, 500);
    } catch (error) {
      console.log('Fail to remove banner: ', error);
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);

    setTimeout(() => {
      setBannerToAdd(null);
    }, 300);
  };

  const handleAddSubmit = async (values, handleResetFormAdd) => {
    const addValues = {
      ...values,
    };

    const addFormData = new FormData();
    for (let key in addValues) {
      const addValue = addValues[key];

      switch (key) {
        case 'thumbnailImage':
          if (addValue.length <= 0) break;
          for (let i = 0; i < addValue.length; i++) {
            addFormData.append(key, addValue.item(i));
          }
          break;

        default:
          addFormData.append(key, addValue);
          break;
      }
    }

    const updateValues = {
      ...values,
    };

    const updateFormData = new FormData();
    for (let key in updateValues) {
      const updateValue = updateValues[key];

      switch (key) {
        case 'thumbnailImage':
          if (updateValue.length <= 0) break;
          for (let i = 0; i < updateValue.length; i++) {
            updateFormData.append(key, updateValue.item(i));
          }
          break;

        default:
          updateFormData.append(key, updateValue);
          break;
      }
    }

    const isUpdate = Boolean(bannerToAdd) || false;

    if (isUpdate) {
      try {
        await bannerApi.updateFormData(bannerToAdd.id, updateFormData);

        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật ảnh bìa thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchBanner();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật ảnh bìa không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    } else {
      try {
        await bannerApi.addFormData(addFormData);

        const actionSnackbar = open({
          status: true,
          message: 'Thêm ảnh bìa thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchBanner();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Thêm ảnh bìa không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    }
  };

  const fetchBanner = async (filters) => {
    try {
      const { data } = await bannerApi.getAll(filters);

      setBannerList(data);
    } catch (error) {
      console.log('Fail to fetch: ', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Danh sách ảnh bìa
      </Typography>
      <BannerTable
        bannerList={bannerList}
        onSubmit={handleSearchSubmit}
        onAddOpenClick={handleClickOpenAdd}
        onRemoveClick={handleRemoveClick}
        onToolbarRemoveClick={handleToolbarRemoveClick}
      />
      <BannerAdd
        onSubmit={handleAddSubmit}
        onClose={handleCloseAdd}
        open={openAdd}
        banner={bannerToAdd}
      />
    </Container>
  );
}

export default Banner;
