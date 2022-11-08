import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import newsApi from '../../../../api/newsApi';
import { STORAGE_USER } from '../../../../constants/common';
import { open } from '../../../Auth/snackbarSlice';
import NewsAdd from '../../components/NewsAdd/NewsAdd';
import NewsTable from '../../components/NewsTable/NewsTable';

News.propTypes = {};

function News(props) {
  const [newsList, setNewsList] = useState([]);
  const [newsToAdd, setNewsToAdd] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth).current;
  const userId = user[STORAGE_USER.ID];

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearchSubmit = async (values) => {
    await fetchNews(values);
  };

  const handleClickOpenAdd = (news) => {
    setOpenAdd(true);
    setNewsToAdd(news);
  };

  const handleRemoveClick = async (newsId) => {
    try {
      await newsApi.remove(newsId);

      const actionSnackbar = open({
        status: true,
        message: 'Xoá bài viết thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchNews();
      }, 500);
    } catch (error) {
      console.log('Fail to remove news: ', error);
    }
  };

  const handleToolbarRemoveClick = (selected) => {
    try {
      selected.forEach(async (id) => {
        await newsApi.remove(id);
      });

      const actionSnackbar = open({
        status: true,
        message: 'Xoá bài viết thành công',
        type: 'success',
      });
      dispatch(actionSnackbar);

      setTimeout(() => {
        fetchNews();
      }, 500);
    } catch (error) {
      console.log('Fail to remove news: ', error);
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);

    setTimeout(() => {
      setNewsToAdd(null);
    }, 300);
  };

  const handleAddSubmit = async (values, handleResetFormAdd) => {
    const addValues = {
      ...values,
      userId,
      approvedId: userId,
      createDate: new Date(),
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

    const isUpdate = Boolean(newsToAdd) || false;

    if (isUpdate) {
      try {
        await newsApi.updateFormData(newsToAdd.id, updateFormData);

        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật bài viết thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchNews();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Cập nhật bài viết không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    } else {
      try {
        await newsApi.addFormData(addFormData);

        const actionSnackbar = open({
          status: true,
          message: 'Thêm bài viết thành công',
          type: 'success',
        });
        dispatch(actionSnackbar);

        setTimeout(() => {
          handleCloseAdd();
        }, 700);

        setTimeout(() => {
          handleResetFormAdd();
          fetchNews();
        }, 1500);
      } catch (error) {
        const actionSnackbar = open({
          status: true,
          message: 'Thêm bài viết không thành công',
          type: 'error',
        });
        dispatch(actionSnackbar);
      }
    }
  };

  const fetchNews = async (filters) => {
    try {
      const { data } = await newsApi.getAll(filters);
      setNewsList(data);
    } catch (error) {
      console.log('Fail to fetch: ', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Danh sách bài viết
      </Typography>
      <NewsTable
        newsList={newsList}
        onSubmit={handleSearchSubmit}
        onAddOpenClick={handleClickOpenAdd}
        onRemoveClick={handleRemoveClick}
        onToolbarRemoveClick={handleToolbarRemoveClick}
      />
      <NewsAdd
        onSubmit={handleAddSubmit}
        onClose={handleCloseAdd}
        open={openAdd}
        news={newsToAdd}
      />
    </Container>
  );
}

export default News;
