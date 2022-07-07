import React from 'react';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';

import './TopBar.css';

export default function TopBar() {
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
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
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
