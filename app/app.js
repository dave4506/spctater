import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import firebase from 'firebase'

import {logger} from './middleware'
import thunk from 'redux-thunk';

import reducer from './reducers'
import App from './containers/app'

var config = {
  apiKey: "AIzaSyA3-uA0BJOSE1PZhE_irHa0cZUwz6c3Xdc",
  authDomain: "contentgen-8876e.firebaseapp.com",
  databaseURL: "https://contentgen-8876e.firebaseio.com",
  storageBucket: "contentgen-8876e.appspot.com",
};
firebase.initializeApp(config);

//let store = createStore(reducer,applyMiddleware(thunk))
let store = createStore(reducer, applyMiddleware(thunk,logger))
render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('root'))
