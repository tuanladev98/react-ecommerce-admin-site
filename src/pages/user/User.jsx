import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  CalendarToday,
  LocationOnOutlined,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from '@material-ui/icons';

import './User.css';

import userApis from '../../api/user.api';
import WidgetLg from '../../components/widget-lg/WidgetLg';
import { changeMenu } from '../../redux/side_bar_slice';

export default function User() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = location.pathname.split('/')[2];
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(changeMenu('USER'));
  }, [dispatch]);

  useEffect(() => {
    userApis
      .getUserById(userId)
      .then((result) => {
        setUser(result.data);
      })
      .catch((error) => setUser(null));
  }, [userId]);

  return (
    user && (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Customer Detail</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.name}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.name}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">21.05.1998</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+84 325 293 636</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationOnOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">Hà Nội</span>
              </div>
            </div>
          </div>
          <WidgetLg
            tableTitle={'User transactions'}
            transactionData={user.orders}
          />
          {/* <div className="userUpdate">
            <span className="userUpdateTitle">Transactions</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="annabeck99"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: 'none' }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    )
  );
}
