import axiosClient from './axiosClient'

const authApi = {
    login(data) {
        const url = '/auth/authenticate';
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    },
    forgotPassword(data) {
        const url = '/auth/forgotPassword';
        return axiosClient.post(url, data);
    },
    resetPassword(data, config) {
        const url = '/auth/forgotPassword/reset';
        return axiosClient.post(url, data, config);
    },
};

export default authApi;