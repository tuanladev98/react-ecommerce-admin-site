import {
  // TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  HomeOutlined,
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './SideBar.css';

export default function SideBar() {
  const { activeMenu } = useSelector((state) => state.sideBar);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={`sidebarListItem ${
                  activeMenu === 'HOME' ? 'active' : ''
                }`}
              >
                <HomeOutlined className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
            <Link to="/support-user" className="link">
              <li
                className={`sidebarListItem ${
                  activeMenu === 'MESSAGE' ? 'active' : ''
                }`}
              >
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/user" className="link">
              <li
                className={`sidebarListItem ${
                  activeMenu === 'USER' ? 'active' : ''
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/product" className="link">
              <li
                className={`sidebarListItem ${
                  activeMenu === 'PRODUCT' ? 'active' : ''
                }`}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/transaction" className="link">
              <li
                className={`sidebarListItem ${
                  activeMenu === 'TRANSACTION' ? 'active' : ''
                }`}
              >
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
            <Link to="/report" className="link">
              <li
                className={`sidebarListItem ${
                  activeMenu === 'REPORT' ? 'active' : ''
                }`}
              >
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
