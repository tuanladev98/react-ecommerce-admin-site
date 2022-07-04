import { useEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import './FeaturedInfo.css';
import numberWithCommas from '../../utils/numberWithCommas';
import statsApis from '../../api/stats.api';
import { useState } from 'react';

export default function FeaturedInfo() {
  const [transactions, setTransactions] = useState(null);
  const [quantitySold, setQuantitySold] = useState(null);
  const [income, setIncome] = useState(null);

  useEffect(() => {
    statsApis
      .getStatsSummary()
      .then((result) => {
        console.log(result);
        const { transactionSummary, quantitySummary, incomeSummary } =
          result.data;

        setTransactions(transactionSummary);
        setQuantitySold(quantitySummary);
        setIncome(incomeSummary);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Transactions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{transactions.currentMonth}</span>
          <span className="featuredMoneyRate">
            {transactions.currentMonth > transactions.lastMonth ? (
              <ArrowUpward className="featuredIcon" />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Quantity Sold</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{quantitySold.currentMonth}</span>
          <span className="featuredMoneyRate">
            {quantitySold.currentMonth > quantitySold.lastMonth ? (
              <ArrowUpward className="featuredIcon" />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">IncomeI</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {numberWithCommas(income.currentMonth)} ₫
          </span>
          <span className="featuredMoneyRate">
            {income.currentMonth > income.lastMonth ? (
              <ArrowUpward className="featuredIcon" />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
