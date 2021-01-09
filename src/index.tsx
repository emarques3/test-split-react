import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SplitProvider } from 'split-react';
import { config } from './split/config';

ReactDOM.render(
    <SplitProvider config={config}>
      <App />
    </SplitProvider>,
  document.getElementById('root')
);

reportWebVitals();
