import { createPrivateRequest } from './axios_client';

const statsApis = {
  getStatsSummary: () => {
    const result = createPrivateRequest.get('/stats/summary');

    return result;
  },

  getListNewestCustomer: () => {
    const result = createPrivateRequest.get('/stats/list-newest-customer');

    return result;
  },

  getListNewestTransaction: () => {
    const result = createPrivateRequest.get('/stats/list-newest-transaction');

    return result;
  },
};

export default statsApis;
