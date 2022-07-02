import './Home.css';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featured-info/FeaturedInfo';
import WidgetSm from '../../components/widget-sm/WidgetSm';
import WidgetLg from '../../components/widget-lg/WidgetLg';
import { userData } from '../../dummyData';

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
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
