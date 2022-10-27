import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header'
import Aside from './components/Aside'
import { DataSourceProvider } from './context/DataSourceContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <DataSourceProvider>
        <Header />
        <Aside />
        <App />
      </DataSourceProvider>
    </Router>
  </React.StrictMode>
);
