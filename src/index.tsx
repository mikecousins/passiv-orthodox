import axios from 'axios';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './providers/AuthProvider';

// import css
import 'tailwindcss/tailwind.css';

axios.defaults.baseURL = 'https://api.passiv.com/api/v1/';

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);

