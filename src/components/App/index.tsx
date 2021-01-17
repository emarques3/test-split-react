import React from 'react';
import './styles.css';
import { Test } from '../Test';
// import TestHOC from '../TestHOC';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Test splitName="test1" />
        {/* <TestHOC /> */}
      </header>
    </div>
  );
}

export default App;
