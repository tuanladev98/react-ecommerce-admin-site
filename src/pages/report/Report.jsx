import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import dayjs from 'dayjs';

import './Report.css';
import FeaturedInfo from '../../components/featured-info/FeaturedInfo';
import statsApis from '../../api/stats.api';
import { changeMenu } from '../../redux/side_bar_slice';

export default function Report() {
  const dispatch = useDispatch();

  const [totalData, setTotalData] = useState([]);
  const [salesByCatData, setSalesByCatData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    dispatch(changeMenu('REPORT'));
  }, [dispatch]);

  useEffect(() => {
    statsApis
      .getStatsTotalByUnits()
      .then((result) => {
        setTotalData(result.data);
      })
      .catch((error) => {
        setTotalData([]);
      });
  }, []);

  useEffect(() => {
    statsApis
      .getStatsSalesPerformanceByCategory()
      .then((result) => {
        setSalesByCatData(result.data);
      })
      .catch((error) => {
        setSalesByCatData([]);
      });
  }, []);

  useEffect(() => {
    statsApis
      .getStatsTransactionsLastSixMonth()
      .then((result) => {
        const data = result.data.map((ele) => {
          return {
            name: dayjs(`${ele.year}-${ele.month}-1`).format('MMM YYYY'),
            // name: `${ele.month} - ${ele.year}`,
            transactions: !ele.quantity ? 0 : ele.quantity,
          };
        });
        setTransactionsData(data);
      })
      .catch((error) => {
        setTransactionsData([]);
      });
  }, []);

  useEffect(() => {
    statsApis
      .getStatsIncomeLastSixMonth()
      .then((result) => {
        const data = result.data.map((ele) => {
          return {
            name: dayjs(`${ele.year}-${ele.month}-1`).format('MMM YYYY'),
            // name: `${ele.month}`,
            income: !ele.quantity ? 0 : ele.quantity,
          };
        });
        setIncomeData(data);
      })
      .catch((error) => {
        setIncomeData([]);
      });
  }, []);

  return (
    <div className="report">
      <FeaturedInfo />

      <div className="statsSection">
        <div className="statsSectionItem">
          <h3 className="statsSectionTitle">
            Total customers, products, transactions, reviews
          </h3>
          <div className="statsChartContainer">
            <BarChart
              width={500}
              height={300}
              data={totalData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="quantity" fill="#8884d8" barSize={30} />
            </BarChart>
          </div>
        </div>

        <div className="statsSectionItem">
          <h3 className="statsSectionTitle">Sales performance by category</h3>
          <div className="statsChartContainer">
            <BarChart
              width={500}
              height={300}
              data={salesByCatData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#f7ae6b" barSize={30} />
            </BarChart>
          </div>
        </div>
      </div>

      <div className="statsSection">
        <div className="statsSectionItem">
          <h3 className="statsSectionTitle">Transactions last six month</h3>
          <div className="statsChartContainer">
            <LineChart
              width={500}
              height={300}
              data={transactionsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="transactions" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>

        <div className="statsSectionItem">
          <h3 className="statsSectionTitle">Income last six months</h3>
          <div className="statsChartContainer">
            <LineChart
              width={500}
              height={300}
              data={incomeData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}
