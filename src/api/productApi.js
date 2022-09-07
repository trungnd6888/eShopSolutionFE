import axiosClient from "./axiosClient";
import qs from 'qs';

const productApi = {
    getAll(params) {
        const url = '/products';
        return axiosClient.get(url, {
            params,
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            },
        });
    },
    getById(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/products';
        return axiosClient.post(url, data);
    },
    addFormData(data) {
        const url = '/products';
        return axiosClient.post(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    update(id, data) {
        const url = `/products/${id}`;
        return axiosClient.patch(url, data);
    }
};

export default productApi;