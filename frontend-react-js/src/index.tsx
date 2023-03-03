import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./services/honeycomb";

const root = ReactDOM.createRoot(
  document.getElementsByTagName('main')[0] as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
