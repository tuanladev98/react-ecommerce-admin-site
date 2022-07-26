import { createPrivateRequest } from './axios_client';

const productApis = {
  getAllForAdminSite: () => {
    return createPrivateRequest().get(`/product/all-for-admin`);
  },

  getDetailForAdminSite: (productId) => {
    return createPrivateRequest().get('/product/detail-for-admin/' + productId);
  },

  createProduct: (data) => {
    return createPrivateRequest().post('/product/create', data);
  },

  updateProduct: (productId, data) => {
    return createPrivateRequest().put('/product/update/' + productId, data);
  },

  deleteProduct: (productId) => {
    return createPrivateRequest().delete('/product/delete/' + productId);
  },
};

export default productApis;
