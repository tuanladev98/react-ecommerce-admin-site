import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';

import Home from './pages/home/Home';
import UserList from './pages/user-list/UserList';
import User from './pages/user/User';
import NewUser from './pages/new-user/NewUser';
import ProductList from './pages/product-list/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/new-product/NewProduct';
import Login from './pages/login/Login';
import SideBar from './components/side-bar/SideBar';
import TopBar from './components/top-bar/TopBar';

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
          <>
            <TopBar />
            <div className="container">
              <SideBar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/new-user">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/new-product">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
