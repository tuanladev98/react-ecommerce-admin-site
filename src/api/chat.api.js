import { createPrivateRequest } from './axios_client';

const chatApis = {
  getAllConversation: () => {
    const result = createPrivateRequest().get('/realtime/conversations');

    return result;
  },

  getMessages: (userId, beforeId) => {
    const result = createPrivateRequest().get(
      '/realtime/conversation/' + userId,
      {
        params: { beforeId },
      }
    );

    return result;
  },
};

export default chatApis;
