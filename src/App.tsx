import React from 'react';
import './App.css';
import { Test } from './components/Test';
// import TestHOC from './components/TestHOC';

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
