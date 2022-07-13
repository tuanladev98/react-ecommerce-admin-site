import { createPrivateRequest } from './axios_client';

const productApis = {
  getAllForAdminSite: () => {
    return createPrivateRequest().get(`/product/all-for-admin`);
  },

  createProduct: (data) => {
    return createPrivateRequest().post('/product/create', data);
  },

  deleteProduct: (productId) => {
    return createPrivateRequest().delete('/product/delete/' + productId);
  },
};

export default productApis;
