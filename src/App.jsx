import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';

import SideBar from './components/side-bar/SideBar';
import TopBar from './components/top-bar/TopBar';
import Home from './pages/home/Home';
import UserList from './pages/user-list/UserList';
import User from './pages/user/User';
// import NewUser from './pages/new-user/NewUser';
import ProductList from './pages/product-list/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/new-product/NewProduct';
import Login from './pages/login/Login';
import ChatBox from './pages/chat-box/ChatBox';
import TransactionList from './pages/transaction-list/TransactionList';
import Transaction from './pages/transaction/Transaction';
import Report from './pages/report/Report';

import { socket, SocketContext } from './socket/socketContext';

function App() {
  const CURRENT_ADMIN = JSON.parse(localStorage.getItem('currentAdmin'));

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {CURRENT_ADMIN ? <Redirect to="/" /> : <Login />}
        </Route>
        {!CURRENT_ADMIN ? (
          <Redirect to="/login" />
        ) : (
          <SocketContext.Provider value={socket}>
            <TopBar />
            <div className="container">
              <SideBar />
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/support-user">
                <ChatBox />
              </Route>

              <Route exact path="/user">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              {/* <Route path="/new-user">
                <NewUser />
              </Route> */}

              <Route exact path="/product">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/new-product">
                <NewProduct />
              </Route>

              <Route exact path="/transaction">
                <TransactionList />
              </Route>
              <Route path="/transaction/:orderCode">
                <Transaction />
              </Route>
              <Route path="/report">
                <Report />
              </Route>
            </div>
          </SocketContext.Provider>
        )}
      </Switch>
    </Router>
  );
}

export default App;
