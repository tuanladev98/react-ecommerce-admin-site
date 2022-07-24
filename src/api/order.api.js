import { createPrivateRequest } from './axios_client';

const orderApis = {
  getAllOrder: () => {
    const result = createPrivateRequest().get('/order/get-all');

    return result;
  },
};

export default orderApis;
