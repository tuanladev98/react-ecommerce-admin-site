import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ExitToAppOutlined,
  NotificationsNone,
  Settings,
} from '@material-ui/icons';

import './TopBar.css';
import { logout } from '../../redux/user_slice';

export default function TopBar() {
  const dispatch = useDispatch();

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Management</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <ExitToAppOutlined
              onClick={() => {
                dispatch(logout());
                window.location.href = '/login';
              }}
            />
          </div>
          <img
            src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
