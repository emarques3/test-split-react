import React from 'react';
import './styles.css';
import { TestCustom } from '../TestCustom';

function AppCustom() {
  return (
    <div className="App">
      <header className="App-header">
        <TestCustom splitName="test1" />
      </header>
    </div>
  );
}

export default AppCustom;
