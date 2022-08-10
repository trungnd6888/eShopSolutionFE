import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://localhost:7095/api',
    // baseURL: 'http://localhost:8000/api',
    header: {
        'Content-Type': 'application/json',
    }
});

axiosClient.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    const { data, config, status } = error.response;
    const urlList = ['/users/authenticate', '/users/register']

    if (urlList.includes(config?.url) && status == 401) {
        throw new Error(data.error);
    }

    return Promise.reject(error);
});

export default axiosClient;