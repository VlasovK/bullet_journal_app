import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducers from './store/rootReducers';
import MainView from './containers/MainView';

import './style/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

let store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MainView />
  </Provider>,
  document.getElementById('root')
);
