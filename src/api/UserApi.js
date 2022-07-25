import axiosClient from './axiosClient'

const userApi = {
    login(data) {
        const url = '/users/authenticate';
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = '/users/register';
        return axiosClient.post(url, data);
    }
};

export default userApi;