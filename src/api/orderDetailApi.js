import axiosClient from './axiosClient';

const orderDetailApi = {
  getTotal() {
    const url = '/orderDetails/total';
    return axiosClient.get(url);
  },
  getTotalQuantity() {
    const url = '/orderDetails/totalquantity';
    return axiosClient.get(url);
  },
};

export default orderDetailApi;
