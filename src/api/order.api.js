import { createPrivateRequest } from './axios_client';

const orderApis = {
  getAllOrder: () => {
    const result = createPrivateRequest().get('/order/get-all');

    return result;
  },

  getOne: (orderCode) => {
    const result = createPrivateRequest().get(
      '/order/order-detail-for-admin/' + orderCode
    );

    return result;
  },

  updateGHN: (orderCode, ghnCode) => {
    const result = createPrivateRequest().put(
      '/order/update-ghn/' + orderCode,
      { ghnCode }
    );

    return result;
  },

  markDelivered: (orderCode) => {
    const result = createPrivateRequest().put(
      '/order/mark-delivered/' + orderCode
    );

    return result;
  },
};

export default orderApis;
