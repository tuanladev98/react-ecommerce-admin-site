import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import dayjs from 'dayjs';

import './Transaction.css';

import orderApis from '../../api/order.api';
import { changeMenu } from '../../redux/side_bar_slice';
import numberWithCommas from '../../utils/numberWithCommas';

export default function Transaction() {
  const location = useLocation();
  const orderId = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(changeMenu('TRANSACTION'));
  }, [dispatch]);

  useEffect(() => {}, []);

  return (
    <div className="transaction">
      <div className="transactionTitleContainer">
        <h1>Transactions Detail</h1>
      </div>

      <div className="transactionDetailContainer">
        <div className="processingAndStatus"></div>

        <div className="orderDetail"></div>
      </div>
    </div>
  );
}
