import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import './Transaction.css';

import orderApis from '../../api/order.api';
import { changeMenu } from '../../redux/side_bar_slice';
import numberWithCommas from '../../utils/numberWithCommas';

export default function Transaction() {
  const location = useLocation();
  const orderCode = location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [ghnCode, setGhnCode] = useState(null);

  useEffect(() => {
    dispatch(changeMenu('TRANSACTION'));
  }, [dispatch]);

  useEffect(() => {
    orderApis
      .getOne(orderCode)
      .then((result) => {
        console.log(result.data);
        setOrder(result.data);
        setGhnCode(result.data.ghnShippingCode);
      })
      .catch((error) => {
        toast.error('An error occur!');
      });
  }, [orderCode]);

  const handleUpdateGHN = (e) => {
    e.preventDefault();
    orderApis
      .updateGHN(orderCode, ghnCode)
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error('An error occur. Please try again!');
      });
  };

  const handleMarkDelivered = (e) => {
    e.preventDefault();
    orderApis
      .markDelivered(orderCode)
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error('An error occur. Please try again!');
      });
  };

  return (
    order && (
      <div className="transaction">
        <div className="transactionTitleContainer">
          <h1>Transactions Detail</h1>
        </div>

        <div className="transactionDetailContainer">
          <div className="processingAndStatus">
            <div className="orderSummaryInfo">
              <h1 className="orderCode">{order.orderCode}</h1>
              <span className="orderInfo">
                Order at: {dayjs(order.createdAt).format('MMMM D, YYYY')} |{' '}
                {order.bills
                  .map((item) => item.quantity)
                  .reduce(
                    (previousVal, currentVal) => previousVal + currentVal,
                    0
                  )}{' '}
                items | {numberWithCommas(order.amount)}₫
              </span>
            </div>

            <div className="orderTrackingStatus">
              <div className="trackingStep">
                <div
                  className={
                    order.status === 'PROCESSING'
                      ? 'stepNumber active'
                      : 'stepNumber'
                  }
                >
                  1
                </div>
                <span
                  className={
                    order.status === 'PROCESSING'
                      ? 'stepTitle active'
                      : 'stepTitle'
                  }
                >
                  Order processing
                </span>
              </div>

              <div className="trackingStep">
                <div
                  className={
                    order.status === 'PREPARING_SHIPMENT'
                      ? 'stepNumber active'
                      : 'stepNumber'
                  }
                >
                  2
                </div>
                <span
                  className={
                    order.status === 'PREPARING_SHIPMENT'
                      ? 'stepTitle active'
                      : 'stepTitle'
                  }
                >
                  Preparing shipment
                </span>
              </div>

              <div className="trackingStep">
                <div
                  className={
                    order.status === 'DELIVERED'
                      ? 'stepNumber active'
                      : 'stepNumber'
                  }
                >
                  3
                </div>
                <span
                  className={
                    order.status === 'DELIVERED'
                      ? 'stepTitle active'
                      : 'stepTitle'
                  }
                >
                  Delivered
                </span>
              </div>
            </div>

            <div className="shippingProcess">
              <h3>ORDER DETAILS</h3>
              <div className="shippingProcessInfo">
                <div className="deliveryAndPaymentInfo">
                  <div className="deliveryAndPaymentInfoPath">
                    <h4>Delivery address:</h4>
                    <span className="infoSpan">{order.receiver}</span>
                    <span className="infoSpan">
                      {order.address}, {order.ward}, {order.district},{' '}
                      {order.province}, VietNam
                    </span>
                  </div>

                  <div className="deliveryAndPaymentInfoPath">
                    <h4>Phone number:</h4>
                    <span className="infoSpan">{order.phoneNumber}</span>
                  </div>

                  <div className="deliveryAndPaymentInfoPath">
                    <h4>Payment information:</h4>
                    <span className="infoSpan">Payment method: Visa Card</span>
                  </div>
                </div>

                <div className="carrierInfo">
                  <h4>Carrier information:</h4>
                  <div className="ghnInfo">
                    <label htmlFor="ghnShippingCode">GHN:</label>
                    <input
                      className="inputGhnCode"
                      id="ghnShippingCode"
                      name="ghnShippingCode"
                      placeholder="Enter GHN code..."
                      value={ghnCode}
                      onChange={(e) => setGhnCode(e.target.value)}
                    />
                    <button
                      className="btnUpdateGhnCode"
                      onClick={handleUpdateGHN}
                    >
                      Update
                    </button>
                  </div>
                  <div
                    className={
                      !order.ghnShippingCode
                        ? 'markShipped disable'
                        : 'markShipped'
                    }
                  >
                    <input
                      type="checkbox"
                      checked={order.status === 'DELIVERED'}
                      onClick={handleMarkDelivered}
                    />
                    <span
                      className={
                        order.status === 'DELIVERED'
                          ? 'isDelivered'
                          : 'isDelivered disable'
                      }
                    >
                      {order.status === 'DELIVERED'
                        ? 'Delivered!'
                        : 'Mark delivered!'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="orderDetail">
            <div className="orderBill">
              <div className="orderBillTitle">ORDER DETAIL</div>
              <div className="orderBillListItem">
                {order.bills.map((item) => {
                  return (
                    <div className="orderBillItem" key={item.id}>
                      <img
                        className="orderBillItemImageProduct"
                        src={item.product.image01}
                        alt=""
                      />
                      <div className="orderBillItemItemDetail">
                        <span>
                          <b>Product:</b> {item.product.productName} (
                          {item.product.code})
                        </span>
                        <span>
                          <b>Size:</b> {item.size.euSize}
                        </span>
                        <span>
                          <b>span:</b> {item.quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="orderSummary">
              <div className="orderSummaryTitle">ORDER SUMMARY</div>
              <div className="orderSummaryItem">
                <span>
                  {order.bills
                    .map((item) => item.quantity)
                    .reduce(
                      (previousVal, currentVal) => previousVal + currentVal,
                      0
                    )}
                  {'  '}
                  ITEMS
                </span>
                <span>{numberWithCommas(order.amount)}₫</span>
              </div>

              <div className="orderSummaryItem">
                <span>DELIVERY</span>
                <span>Free</span>
              </div>

              <div className="orderSummaryItem total">
                <span>TOTAL</span>
                <span>{numberWithCommas(order.amount)}₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
