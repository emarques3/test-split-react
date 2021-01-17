/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './components/App';
import AppCustom from './components/AppCustom';
import { SplitProvider } from 'split-react';
import { CustomProvider } from './components/CustomProvider';
import { config } from './split/config';

// With split-react built in Provider
ReactDOM.render(
  <SplitProvider config={config}>
    <App />
  </SplitProvider>,
  document.getElementById('root')
);

// With your custom provider
// ReactDOM.render(
//   <CustomProvider>
//     <AppCustom />
//   </CustomProvider>,
//   document.getElementById('root')
// );

reportWebVitals();
