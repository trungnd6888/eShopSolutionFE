import axiosClient from "./axiosClient";

const roleClaimApi = {
    getAll(params) {
        const url = '/roleClaims';
        return axiosClient.get(url, { params });
    },
    add(data) {
        const url = '/roleClaims';
        return axiosClient.post(url, data);
    },
    remove(id) {
        const url = `/roleClaims/${id}`;
        return axiosClient.delete(url);
    },
}

export default roleClaimApi;