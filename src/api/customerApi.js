import axiosClient from './axiosClient';
import qs from 'qs';

const customerApi = {
  getAll(params) {
    const url = '/customers';
    return axiosClient.get(url, {
      params,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  },
  getById(id) {
    const url = `/customers/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/customers';
    return axiosClient.post(url, data);
  },
  addFormData(data) {
    const url = '/customers';
    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove(id) {
    const url = `/customers/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/customers/${id}`;
    return axiosClient.patch(url, data);
  },
  updateFormData(id, data) {
    const url = `/customers/${id}`;
    return axiosClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default customerApi;
