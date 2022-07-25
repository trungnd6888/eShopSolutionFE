import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://localhost:7095/api',
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
    return Promise.reject(error);
});

export default axiosClient;