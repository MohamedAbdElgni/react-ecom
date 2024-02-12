import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import mystore from './Store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <Provider store={mystore}>
      <App />
      </Provider>
    </AuthProvider>
  </Router>
);

reportWebVitals();