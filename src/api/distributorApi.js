import axiosClient from './axiosClient';

const distributorApi = {
    getAll() {
        const url = '/distributors';
        return axiosClient.get(url);
    }
};

export default distributorApi;