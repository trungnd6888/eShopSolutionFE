import axios from 'axios';
import axiosClient from './axiosClient';

const distributorApi = {
    getAll(params) {
        const url = '/distributors';
        return axiosClient.get(url, { params });
    },
    getById(id) {
        const url = `/distributors/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/distributors';
        return axiosClient.post(url, data);
    },
    update(id, data) {
        const url = `/distributors/${id}`;
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = `/distributors/${id}`;
        return axiosClient.delete(url);
    },
};

export default distributorApi;