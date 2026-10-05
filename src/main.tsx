import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { FinanceProvider } from './context/FinanceContext';
import './styles/globals.css';
import './styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </React.StrictMode>
);
