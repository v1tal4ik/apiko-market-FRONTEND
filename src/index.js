import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import Router from './components/Router';
import './index.css';

export const store = createStore();

ReactDOM.render(
    <Provider store = { store } >
      <Router />
    </Provider>,
    document.getElementById('root'),
);
