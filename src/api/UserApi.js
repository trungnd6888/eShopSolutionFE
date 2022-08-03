import axiosClient from './axiosClient'

const userApi = {
    login(data) {
        const url = '/users/authenticate';
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = '/users/register';
        return axiosClient.post(url, data);
    },
    forgotPassword(data) {
        const url = '/users/forgotPassword';
        return axiosClient.post(url, data);
    },
    resetPassword(data, config) {
        const url = '/users/resetPassword';
        return axiosClient.post(url, data, config);
    },
};

export default userApi;