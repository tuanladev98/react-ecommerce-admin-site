import { useState, useEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

import './FeaturedInfo.css';
import numberWithCommas from '../../utils/numberWithCommas';
import statsApis from '../../api/stats.api';

export default function FeaturedInfo() {
  const [transactions, setTransactions] = useState(null);
  const [loginQuantity, setLoginQuantity] = useState(null);
  const [income, setIncome] = useState(null);

  useEffect(() => {
    statsApis
      .getStatsSummary()
      .then((result) => {
        const { transactionSummary, loginQuantitySummary, incomeSummary } =
          result.data;

        setTransactions(transactionSummary);
        setLoginQuantity(loginQuantitySummary);
        setIncome(incomeSummary);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Income</span>
        {income && (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">
              {numberWithCommas(income.currentMonth)}₫
            </span>
            <span className="featuredMoneyRate">
              {income.currentMonth >= income.lastMonth ? (
                <>
                  +{numberWithCommas(income.currentMonth - income.lastMonth)}₫{' '}
                  <ArrowUpward className="featuredIcon" />
                </>
              ) : (
                <>
                  -{numberWithCommas(income.lastMonth - income.currentMonth)}₫{' '}
                  <ArrowDownward className="featuredIcon negative" />
                </>
              )}
            </span>
          </div>
        )}
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Transactions</span>
        {transactions && (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{transactions.currentMonth}</span>
            <span className="featuredMoneyRate">
              {transactions.currentMonth >= transactions.lastMonth ? (
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
        <span className="featuredTitle">Login Quantity</span>
        {loginQuantity && (
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{loginQuantity.currentMonth}</span>
            <span className="featuredMoneyRate">
              {loginQuantity.currentMonth >= loginQuantity.lastMonth ? (
                <>
                  +{loginQuantity.currentMonth - loginQuantity.lastMonth}{' '}
                  <ArrowUpward className="featuredIcon" />
                </>
              ) : (
                <>
                  {loginQuantity.currentMonth - loginQuantity.lastMonth}{' '}
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
