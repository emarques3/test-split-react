import { useSplit } from 'split-react';

export const Test = ({ splitName }: { splitName: string }) => {
  const split = useSplit(splitName, false);
  const color = split ? '#00FF00' : '#FF0000';

  return (
    <>
      <h1>Test</h1>
      <h2>The flag <i>{splitName}</i> is <strong style={{ color }}>{split ? 'ON' : 'OFF'}</strong></h2>
    </>
  );
};