import axiosClient from './axiosClient';

const historyApi = {
  getAll() {
    const url = '/histories';
    return axiosClient.get(url);
  },
  getById(id) {
    const url = `/histories/${id}`;
    return axiosClient.get(url);
  },
  getNew() {
    const url = `/new/histories`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/histories/${id}`;
    return axiosClient.delete(url);
  },
};

export default historyApi;
