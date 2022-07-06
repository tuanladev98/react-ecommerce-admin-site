import { useState, useEffect } from 'react';

import './Home.css';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featured-info/FeaturedInfo';
import WidgetSm from '../../components/widget-sm/WidgetSm';
import WidgetLg from '../../components/widget-lg/WidgetLg';
import statsApis from '../../api/stats.api';

export default function Home() {
  const [customerAnalyticsData, setCustomerAnalyticsData] = useState([]);

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
        <WidgetLg />
      </div>
    </div>
  );
}
