import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Login.css';
import authApis from '../../api/auth.api';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from '../../redux/user_slice';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState(
    'Something went wrong...'
  );
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) alert('Please input email!');
    else if (!password) alert('Please input password!');
    else {
      // login
      const login = async (dispatch, email, password) => {
        dispatch(loginStart());
        try {
          const loginResult = await authApis.login(email, password);
          dispatch(loginSuccess(loginResult.data));
        } catch (error) {
          const { statusCode, message } = error.response.data;
          if (statusCode < 500) setLoginErrorMessage(message);
          else setLoginErrorMessage('Something went wrong...');
          dispatch(loginFailure());
        }
      };
      login(dispatch, email, password);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <h1 style={{ fontSize: '24px', fontWeight: '300' }}>SIGN IN</h1>
        <div className="loginForm">
          <input
            className="inputCredential"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputCredential"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="buttonContainer">
            <button
              className="buttonLogin"
              onClick={handleLogin}
              disabled={isFetching}
            >
              LOGIN
            </button>
          </div>
          {isError && <span style={{ color: 'red' }}>{loginErrorMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
