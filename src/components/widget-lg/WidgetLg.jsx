import { useEffect, useState } from 'react';
import { format as formatTimeAgo } from 'timeago.js';
import { Visibility } from '@material-ui/icons';

import './WidgetLg.css';

import statsApis from '../../api/stats.api';
import numberWithCommas from '../../utils/numberWithCommas';

export default function WidgetLg() {
  const [newestTransactions, setNewestTransactions] = useState([]);

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

  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Newest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh"></th>
        </tr>
        {newestTransactions.map((transaction) => {
          return (
            <tr className="widgetLgTr" key={transaction.id}>
              <td className="widgetLgUser">
                <img
                  src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{transaction.user.name}</span>
              </td>
              <td className="widgetLgDate">
                {formatTimeAgo(transaction.createdAt)}
              </td>
              <td className="widgetLgAmount">
                {numberWithCommas(transaction.amount)}₫
              </td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
              <td className="widgetLgDetail">
                <button className="widgetLgDetailBtn">
                  <Visibility className="widgetLgDetailIcon" />
                  Details
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
