import { format as formatTimeAgo } from 'timeago.js';
import {
  Archive,
  Brightness5,
  LocalShipping,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

import './WidgetLg.css';

import numberWithCommas from '../../utils/numberWithCommas';

export default function WidgetLg(props) {
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{props.tableTitle}</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Order Code</th>
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh"></th>
        </tr>
        {props.transactionData.map((transaction) => {
          return (
            <tr className="widgetLgTr" key={transaction.id}>
              <td className="widgetLgCode">
                <span>{transaction.orderCode}</span>
              </td>
              <td className="widgetLgUser">{transaction.user.name}</td>
              <td className="widgetLgDate">
                {formatTimeAgo(transaction.createdAt)}
              </td>
              <td className="widgetLgAmount">
                {!transaction.stripeSucceededPaymentIntentId ? (
                  <span className="paymentStatus unpaid">
                    Unpaid - {numberWithCommas(transaction.amount)}₫
                  </span>
                ) : (
                  <span className="paymentStatus paid">
                    Paid - {numberWithCommas(transaction.amount)}₫
                  </span>
                )}
              </td>
              <td className="widgetLgStatus">
                {transaction.status === 'PROCESSING' && (
                  <span className="widgetLgStatusBtn processing">
                    <Brightness5 className="widgetLgStatusIcon" />
                    Processing
                  </span>
                )}

                {transaction.status === 'PREPARING_SHIPMENT' && (
                  <span className="widgetLgStatusBtn preparing_shipment">
                    <Archive className="widgetLgStatusIcon" />
                    Preparing
                  </span>
                )}

                {transaction.status === 'DELIVERED' && (
                  <span className="widgetLgStatusBtn delivered">
                    <LocalShipping className="widgetLgStatusIcon" />
                    Delivered
                  </span>
                )}
              </td>
              <td className="widgetLgDetail">
                {transaction.stripeSucceededPaymentIntentId ? (
                  <button className="widgetLgDetailBtn active">
                    <Visibility />
                  </button>
                ) : (
                  <button className="widgetLgDetailBtn disable">
                    <VisibilityOff />
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
