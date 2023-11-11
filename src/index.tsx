import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import './index.css';
import './styles.css';
import App from './App';
import store from './store';
// import dotenv from 'dotenv';
// dotenv.config();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
