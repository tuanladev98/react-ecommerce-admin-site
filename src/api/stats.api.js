import { createPrivateRequest } from './axios_client';

const statsApis = {
  getStatsSummary: () => {
    const result = createPrivateRequest().get('/stats/summary');

    return result;
  },

  getChartCustomerAnalytics: () => {
    const result = createPrivateRequest().get('/stats/customer-analytics');

    return result;
  },

  getListNewestCustomer: () => {
    const result = createPrivateRequest().get('/stats/list-newest-customer');

    return result;
  },

  getListNewestTransaction: () => {
    const result = createPrivateRequest().get('/stats/list-newest-transaction');

    return result;
  },

  getStatsProductSalesPerformance: (productId) => {
    const result = createPrivateRequest().get(
      '/stats/product-sales-performance/' + productId
    );
    return result;
  },

  getStatsTotalByUnits: () => {
    return createPrivateRequest().get('/stats/total-by-units');
  },

  getStatsSalesPerformanceByCategory: () => {
    return createPrivateRequest().get('/stats/sales-performance-by-cat');
  },

  getStatsTransactionsLastSixMonth: () => {
    return createPrivateRequest().get('/stats/transactions-latest-six-month');
  },

  getStatsIncomeLastSixMonth: () => {
    return createPrivateRequest().get('/stats/income-latest-six-month');
  },
};

export default statsApis;
