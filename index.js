import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import './index.scss';

import App from './containers/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ createStoreWithMiddleware(reducers) }>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
