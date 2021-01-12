import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'https://api.passiv.com/api/v1/';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
