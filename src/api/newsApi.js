import axiosClient from './axiosClient';
import qs from 'qs';

const newsApi = {
  getAll(params) {
    const url = '/news';
    return axiosClient.get(url, {
      params,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  },
  getById(id) {
    const url = `/news/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/news';
    return axiosClient.post(url, data);
  },
  addFormData(data) {
    const url = '/news';
    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove(id) {
    const url = `/news/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/news/${id}`;
    return axiosClient.patch(url, data);
  },
  updateFormData(id, data) {
    const url = `/news/${id}`;
    return axiosClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default newsApi;
