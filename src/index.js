import {applyMiddleware, createStore} from 'redux';
import MainView from './containers/MainView';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducers from './store/rootReducers';
import thunk from 'redux-thunk';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './style/style.css';

let store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MainView />
  </Provider>,
  document.getElementById('root')
);
