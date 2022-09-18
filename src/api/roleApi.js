import axiosClient from "./axiosClient";
import qs from 'qs';

const roleApi = {
    getAll(params) {
        const url = '/roles';
        return axiosClient.get(url, {
            params,
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            },
        });
    },
    getById(id) {
        const url = `/roles/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/roles';
        return axiosClient.post(url, data);
    },
    remove(id) {
        const url = `/roles/${id}`;
        return axiosClient.delete(url);
    },
    update(id, data) {
        const url = `/roles/${id}`;
        return axiosClient.patch(url, data);
    }
};

export default roleApi;