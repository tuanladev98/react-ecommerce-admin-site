import { createPrivateRequest } from './axios_client';

const statsApis = {
  getStatsSummary: () => {
    const result = createPrivateRequest.get('/stats/summary');

    return result;
  },
};

export default statsApis;
