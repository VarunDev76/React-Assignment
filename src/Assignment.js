/**
 *  Import node modules
 */
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import { httpHandleError, getToken } from './utils/helper';

/**
 *  Prepare the redux store
 */
import reducers from './reducers'

import LoginLayout from "./layouts/LoginAuth.jsx";
import UserLayout from "./layouts/User.jsx";

/**
 *  Implement interceptor for handle global error handling
 */
const middlewareConfig = {
  interceptors: {
    request: [
      {
        success: function({ getState, dispatch, getSourceAction }, req) {
          const token = getToken();
          if (token) {
            req.headers['Authorization'] = 'Bearer ' + token;
          }
          return req
        }
      }
    ],
    response: [
      {
        success: function({ getState, dispatch, getSourceAction }, response) {
          return response
        },
        error: function({ getState, dispatch, getSourceAction }, error) {
          httpHandleError(error);
          return Promise.reject(error)
        }
      }
    ]
  }
}

const AssignmentClient = axios.create({
  responseType: 'json',
});

const createStoreWithMiddleware = applyMiddleware(
  axiosMiddleware(AssignmentClient, middlewareConfig),
  thunk
)(createStore)
const store = createStoreWithMiddleware(
  reducers,
  undefined,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({
          name: 'Assignment'
        })
      : f => f
  )
)

const Assignment = props => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/public" render={props => <LoginLayout {...props} />} />
          <Route path="/user" render={props => <UserLayout {...props} />} />
          <Redirect from="/" to="/public/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Assignment
