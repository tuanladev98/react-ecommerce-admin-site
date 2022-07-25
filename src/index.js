import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-right" newestOnTop autoClose={1500} />
  </Provider>,
  document.getElementById('root')
);
