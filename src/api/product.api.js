import { createPrivateRequest } from './axios_client';

const productApis = {
  getAllForAdminSite: () => {
    return createPrivateRequest().get(`/product/all-for-admin`);
  },

  deleteProduct: (productId) => {
    return createPrivateRequest().delete('/product/delete/' + productId);
  },
};

export default productApis;
