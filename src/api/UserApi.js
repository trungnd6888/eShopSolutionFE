import axiosClient from './axiosClient';
import qs from 'qs';

const userApi = {
  getAll(params) {
    const url = '/users';
    return axiosClient.get(url, {
      params,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  },
  getById(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/users';
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/users/${id}`;
    return axiosClient.patch(url, data);
  },
  updateFormData(id, data) {
    const url = `/users/${id}`;
    return axiosClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default userApi;
