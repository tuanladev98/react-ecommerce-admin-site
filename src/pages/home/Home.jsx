import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './Home.css';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featured-info/FeaturedInfo';
import WidgetSm from '../../components/widget-sm/WidgetSm';
import WidgetLg from '../../components/widget-lg/WidgetLg';
import statsApis from '../../api/stats.api';
import { changeMenu } from '../../redux/side_bar_slice';

export default function Home() {
  const dispatch = useDispatch();
  const [customerAnalyticsData, setCustomerAnalyticsData] = useState([]);
  const [newestTransactions, setNewestTransactions] = useState([]);

  useEffect(() => {
    dispatch(changeMenu('HOME'));
  }, [dispatch]);

  useEffect(() => {
    statsApis.getChartCustomerAnalytics().then((result) => {
      setCustomerAnalyticsData(
        result.data.map((ele) => {
          return {
            name: `${ele.month}/${ele.year}`,
            'Active User': !ele.quantity ? 0 : ele.quantity,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    statsApis
      .getListNewestTransaction()
      .then((result) => {
        setNewestTransactions(result.data);
      })
      .catch((error) => {
        setNewestTransactions([]);
      });
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={customerAnalyticsData}
        title="Customer Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg
          tableTitle={'Newest transactions'}
          transactionData={newestTransactions}
        />
      </div>
    </div>
  );
}
