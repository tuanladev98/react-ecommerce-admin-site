import { createPrivateRequest } from './axios_client';

const chatApis = {
  getAllConversation: () => {
    const result = createPrivateRequest().get('/realtime/conversations');

    return result;
  },
};

export default chatApis;
