import React from 'react';
import './App.css';
import { Test } from './components/Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Test splitName="test1" />
      </header>
    </div>
  );
}

export default App;
