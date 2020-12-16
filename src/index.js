import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Assignment from './Assignment';
import * as serviceWorker from './serviceWorker';
import "assets/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/css/fontawesome.min.css";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(<Assignment />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
