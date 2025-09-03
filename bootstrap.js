import React from 'react';
import ReactDOM from 'react-dom';
import 'ag-grid-community';
import 'ag-grid-enterprise';
import '@salt-ds/theme/index.css';
import '@salt-ds/ag-grid-theme/salt-ag-theme.css';
import '@salt-ds/icons/saltIcons.css';
import '@jpmuitk/style/css/jpmuitk.css';
import 'ag-grid-community/styles/ag-grid.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
