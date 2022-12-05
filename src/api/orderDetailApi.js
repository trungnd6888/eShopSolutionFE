import axiosClient from './axiosClient';

const orderDetailApi = {
  getTotal() {
    const url = '/total/orderDetails';
    return axiosClient.get(url);
  },
  getTotalQuantity() {
    const url = '/totalquantity/orderDetails';
    return axiosClient.get(url);
  },
};

export default orderDetailApi;
