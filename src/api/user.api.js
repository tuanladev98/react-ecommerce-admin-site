import { createPrivateRequest } from './axios_client';

const userApis = {
  getAllUser: () => {
    const result = createPrivateRequest().get('/user');

    return result;
  },

  getUserById: (userId) => {
    const result = createPrivateRequest().get('/user/' + userId);

    return result;
  },
};

export default userApis;
