import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import './_style/custom.css';
import store from './redux/store';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
module.hot.accept();
