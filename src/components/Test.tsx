import React from 'react';
import { useCustomSplit } from '../split/useCustomSplit';

export const Test = ({ splitName }: { splitName: string }) => {
  const split = useCustomSplit(splitName, false);
  const color = split ? '#00FF00' : '#FF0000'
  return (
    <h1>The flag <i>{splitName}</i> is <strong style={{ color }}>{split ? 'ON' : 'OFF'}</strong></h1>
  );
};
