import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import './FeaturedInfo.css';
import numberWithCommas from '../../utils/numberWithCommas';

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{numberWithCommas(1000000)} ₫</span>
          <span className="featuredMoneyRate">
            %20 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{numberWithCommas(1000000)} ₫</span>
          <span className="featuredMoneyRate">
            %20 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{numberWithCommas(1000000)} ₫</span>
          <span className="featuredMoneyRate">
            %20 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
