import React from 'react';
import { withSplit } from 'split-react';

const TestHOC = ({ splitFlagOn }: { splitFlagOn?: boolean }) => {
  const color = splitFlagOn ? '#00FF00' : '#FF0000';

  return (
    <h1>The flag  is <strong style={{ color }}>{splitFlagOn ? 'ON' : 'OFF'}</strong></h1>
  );
};

export default withSplit(TestHOC, 'test1', true);
