import { useState, useEffect } from 'react';
import { Visibility } from '@material-ui/icons';

import './WidgetSm.css';
import statsApis from '../../api/stats.api';

export default function WidgetSm() {
  const [newestCustomers, setNewestCustomers] = useState([]);

  useEffect(() => {
    statsApis
      .getListNewestCustomer()
      .then((result) => {
        setNewestCustomers(result.data);
      })
      .catch((error) => {
        setNewestCustomers([]);
      });
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newestCustomers.map((customer) => {
          return (
            <li className="widgetSmListItem" key={customer.id}>
              <img
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{customer.name}</span>
                <span className="widgetSmUserTitle">{customer.email}</span>
              </div>
              <div>
                {customer.gender === 'MALE' ? (
                  <span>Male</span>
                ) : (
                  <span>Female</span>
                )}
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
