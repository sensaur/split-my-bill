import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import InputContext from './components/Context/CheckoutPageContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <InputContext>
        <App />
      </InputContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
