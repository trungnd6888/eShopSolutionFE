import axiosClient from './axiosClient';

const statusApi = {
  getAll(params) {
    const url = '/status';
    return axiosClient.get(url, { params });
  },
  getById(id) {
    const url = `/status/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/status';
    return axiosClient.post(url, data);
  },
  update(id, data) {
    const url = `/status/${id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `status/${id}`;
    return axiosClient.delete(url);
  },
};

export default statusApi;
