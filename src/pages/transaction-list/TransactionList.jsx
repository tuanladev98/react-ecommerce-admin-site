import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DataGrid } from '@material-ui/data-grid';
import {
  Archive,
  Brightness5,
  LocalShipping,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

import './TransactionList.css';

import orderApis from '../../api/order.api';
import { changeMenu } from '../../redux/side_bar_slice';
import numberWithCommas from '../../utils/numberWithCommas';

export default function TransactionList() {
  const dispatch = useDispatch();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    dispatch(changeMenu('TRANSACTION'));
  }, [dispatch]);

  useEffect(() => {
    orderApis
      .getAllOrder()
      .then((result) => {
        setTransactionData(result.data);
      })
      .catch((error) => {
        setTransactionData([]);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'orderCode', headerName: 'Order Code', width: 150 },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 200,
      renderCell: (params) => {
        return <span>{params.row.user.name}</span>;
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      renderCell: (params) => {
        return (
          <span>{dayjs(params.row.createdAt).format('DD-MM-YYYY HH:mm')}</span>
        );
      },
    },

    {
      field: 'items',
      headerName: 'Items',
      width: 120,
      renderCell: (params) => {
        return (
          <span>
            {params.row.bills
              .map((item) => item.quantity)
              .reduce(
                (previousVal, currentVal) => previousVal + currentVal,
                0
              )}{' '}
            items
          </span>
        );
      },
    },

    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {!params.row.stripeSucceededPaymentIntentId ? (
              <span className="paymentStatus unpaid">
                Unpaid - {numberWithCommas(params.row.amount)}₫
              </span>
            ) : (
              <span className="paymentStatus paid">
                Paid - {numberWithCommas(params.row.amount)}₫
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: 'statusOrder',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        if (params.row.status === 'PROCESSING')
          return (
            <div>
              <span className="transactionStatus processing">
                <Brightness5 className="transactionStatusIcon" />
                PROCESSING
              </span>
            </div>
          );

        if (params.row.status === 'PREPARING_SHIPMENT')
          return (
            <div>
              <span className="transactionStatus preparing_shipment">
                <Archive className="transactionStatusIcon" />
                PREPARING
              </span>
            </div>
          );

        if (params.row.status === 'DELIVERED')
          return (
            <div>
              <span className="transactionStatus delivered">
                <LocalShipping className="transactionStatusIcon" />
                DELIVERED
              </span>
            </div>
          );
      },
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return params.row.stripeSucceededPaymentIntentId ? (
          <Link to={'/transaction/' + params.row.id}>
            <button className="widgetLgDetailBtn active">
              <Visibility />
            </button>
          </Link>
        ) : (
          <button className="widgetLgDetailBtn disable">
            <VisibilityOff />
          </button>
        );
      },
    },
  ];

  return (
    transactionData.length && (
      <div className="transactionList">
        <div className="transactionListTitleContainer">
          <h1>Transactions List</h1>
        </div>
        <DataGrid
          rows={transactionData}
          autoHeight
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection={true}
        />
      </div>
    )
  );
}
