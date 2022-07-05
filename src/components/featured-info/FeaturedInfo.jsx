import { useState, useEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import './FeaturedInfo.css';
import numberWithCommas from '../../utils/numberWithCommas';
import statsApis from '../../api/stats.api';

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
        {transactions && (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{transactions.currentMonth}</span>
            <span className="featuredMoneyRate">
              {transactions.currentMonth > transactions.lastMonth ? (
                <>
                  +{transactions.currentMonth - transactions.lastMonth}{' '}
                  <ArrowUpward className="featuredIcon" />
                </>
              ) : (
                <>
                  {transactions.currentMonth - transactions.lastMonth}{' '}
                  <ArrowDownward className="featuredIcon negative" />
                </>
              )}
            </span>
          </div>
        )}
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Quantity Sold</span>
        {quantitySold && (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{quantitySold.currentMonth}</span>
            <span className="featuredMoneyRate">
              {quantitySold.currentMonth > quantitySold.lastMonth ? (
                <>
                  +{quantitySold.currentMonth - quantitySold.lastMonth}{' '}
                  <ArrowUpward className="featuredIcon" />
                </>
              ) : (
                <>
                  {quantitySold.currentMonth - quantitySold.lastMonth}{' '}
                  <ArrowDownward className="featuredIcon negative" />
                </>
              )}
            </span>
          </div>
        )}
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Income</span>
        {income && (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {numberWithCommas(income.currentMonth)}₫
            </span>
            <span className="featuredMoneyRate">
              {income.currentMonth > income.lastMonth ? (
                <>
                  %
                  {Math.round(
                    ((income.currentMonth - income.lastMonth) /
                      income.lastMonth) *
                      100 *
                      100
                  ) / 100}{' '}
                  <ArrowUpward className="featuredIcon" />
                </>
              ) : (
                <>
                  %
                  {Math.round(
                    ((income.lastMonth - income.currentMonth) /
                      income.lastMonth) *
                      100 *
                      100
                  ) / 100}{' '}
                  <ArrowDownward className="featuredIcon negative" />
                </>
              )}
            </span>
          </div>
        )}
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
