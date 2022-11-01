import axiosClient from './axiosClient';

const bannerApi = {
  getAll(params) {
    const url = '/banners';
    return axiosClient.get(url, { params });
  },
  getById(id) {
    const url = `/banners/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/banners';
    return axiosClient.post(url, data);
  },
  addFormData(data) {
    const url = '/banners';
    return axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update(id, data) {
    const url = `/banners/${id}`;
    return axiosClient.patch(url, data);
  },
  updateFormData(id, data) {
    const url = `/banners/${id}`;
    return axiosClient.patch(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove(id) {
    const url = `banners/${id}`;
    return axiosClient.delete(url);
  },
};

export default bannerApi;
