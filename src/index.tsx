import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CustomProvider } from './components/CustomProvider';

ReactDOM.render(
  <CustomProvider>
    <App />
  </CustomProvider>,
  document.getElementById('root')
);

reportWebVitals();
